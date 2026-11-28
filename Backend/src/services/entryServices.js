const mongoose=require('mongoose');
const Entry=require('../models/Entry');
const Notebook=require('../models/Notebook');
const createError=(status,message)=>{
        const error=new Error(message);
        error.status=status;
        return error;
}

// conditional checking :kind===resource

const verifyResourceFields = (resourceDetails) => {

    if (
        !resourceDetails ||
        typeof resourceDetails !== 'object' ||
        Array.isArray(resourceDetails)
    ) {
        throw createError(400, 'Resource details are required.');
    }

    const stringFields = ['url', 'platform', 'resourceType'];

    for (const field of stringFields) {
        if (
            resourceDetails[field] !== undefined &&
            typeof resourceDetails[field] !== 'string'
        ) {
            throw createError(400, `Invalid ${field}.`);
        }
    }

    // URL validation
    if (
    resourceDetails.url !== undefined &&
    resourceDetails.url.trim() !== ''
)  {
        try {
            const url = new URL(resourceDetails.url);

            if (!['http:', 'https:'].includes(url.protocol)) {
                throw new Error();
            }
        } catch {
            throw createError(400, 'Invalid resource URL.');
        }
    }

    // Resource type validation
    const allowedResourceTypes = [
        'video',
        'article',
        'documentation',
        'course',
        'repository',
        'other'
    ];

    if (
        resourceDetails.resourceType !== undefined &&
        !allowedResourceTypes.includes(resourceDetails.resourceType)
    ) {
        throw createError(400, 'Invalid resource type.');
    }
};


// verify entries
const verifyEntryFields=(data)=>{
        const {title,description,content,contentFormat='markdown',kind,tags,isFavorite,attachments,problemDetails,resourceDetails}=data;
        const allowedContentFormat=['markdown'];
        const allowedKinds=['problem','note','resource'];
        if(typeof title!=='string'||title.trim().length===0){
                const error=new Error('Please enter a valid title.');
                error.status=400;
                throw error;
        }
        if(description!==undefined&&typeof description!=='string') {
                const error=new Error('Please enter a valid description.');
                error.status=400;
                throw error;
        }
        if(content!=undefined&& typeof content !=='string') {
                const error=new Error('Please enter valid content.');
                error.status=400;
                throw error;
        }
        
        if (data.title.trim().length > 150) {
        throw createError(400, "Title cannot exceed 150 characters");
        }

        if (data.description && data.description.length > 500) {
        throw createError(400, "Description is too long");
        }

        if (data.content && data.content.length > 100000) {
        throw createError(400, "Content is too long");
        }
        if(typeof contentFormat!=='string'||!allowedContentFormat.includes(contentFormat)){
                const error=new Error('Please provide a valid content format.');
                error.status=400;
                throw error;
        }
        if(typeof kind !=='string'||!allowedKinds.includes(kind)){
                const error=new Error('Please provide a valid entry type.');
                error.status=400;
                throw error;
        }
        if (
                tags !== undefined &&
                (!Array.isArray(tags) || tags.length > 0)
                ) {
                throw createError(400, 'Tags are not supported yet.');
                }

                if (
                attachments !== undefined &&
                (!Array.isArray(attachments) || attachments.length > 0)
                ) {
                throw createError(400, 'Attachments are not supported yet.');
        }
        if(isFavorite!=undefined &&typeof isFavorite!=='boolean'){
                throw createError(400,'Invalid favorite value');
        } 
        if(kind==='problem'){
                verifyProblemFields(problemDetails);
        }

        if(kind!=='problem'&&problemDetails !== undefined && problemDetails !== null) {
        throw createError(
            400,
            "Problem details are only allowed for problem entries."
        );
        
        }
        if(kind==='resource'){
                verifyResourceFields(resourceDetails);
        }
        if(kind!=='resource'&&resourceDetails!==undefined&&resourceDetails!==null){
                throw createError(400,"Resource details are allowed only for resource entries");
        }

}


const verifyProblemFields=(problemDetails)=>{
        
       if (
        !problemDetails ||
        Array.isArray(problemDetails) ||
        typeof problemDetails !== 'object' ||
        Object.keys(problemDetails).length === 0
        ) {
        throw createError(400, 'Problem details are required');
        }


        const stringFields=['platform','problemUrl','externalProblemId','difficulty','solutionLanguage','trigger','mistake','keyInsight','pattern','revisionNote'];
        
        
        for(const field of stringFields ) {
                if(problemDetails[field]!==undefined&&typeof problemDetails[field]!=='string') {
                        throw createError(400,`Invalid ${field}`);
                }
        }



        if (
            problemDetails.rating !== undefined &&
            (
                typeof problemDetails.rating !== "number" ||
                !Number.isFinite(problemDetails.rating) ||
                problemDetails.rating < 0
            )
        ) {
            throw createError(400, "Invalid problem rating.");
        }

        if(problemDetails.solvedAt!=undefined &&!Number.isFinite(new Date(problemDetails.solvedAt).getTime()) ){
               throw createError(400,"Invalid solved date."); 
        }

        if (problemDetails.problemUrl) {
        try {
            const url = new URL(problemDetails.problemUrl);

            if (!['http:', 'https:'].includes(url.protocol)) {
                throw new Error();
            }
        } catch {
            throw createError(400, 'Invalid problem URL.');
        }
    }

}

const createEntry=async(entryData)=>{
        if (!entryData || typeof entryData !== 'object' || Array.isArray(entryData)) {
                throw  createError(400, 'Invalid request data.');
        }
        const {userID,notebookID,data}=entryData;
        if (!data || typeof data !== 'object' || Array.isArray(data)) {
            throw createError(400, 'Invalid entry data.');
        }
        verifyEntryFields(data);
        const {
                title,
                description,
                content,
                contentFormat='markdown',
                kind,
                isFavorite=false,
                problemDetails,
                resourceDetails
        } = data;
        const notebook =await Notebook.findOne({
                user:userID,_id:notebookID
        });
        if(!notebook) {
                throw createError(404,'Notebook does not exist.');
        }

        const normalizedDescription = (description ?? "").trim();
        const normalizedContent = (content ?? "").trim();
        const response = await Entry.create({
                user:userID,
                notebook:notebookID,
                title:title.trim(),
                description:normalizedDescription,
                content:normalizedContent,
                contentFormat:contentFormat,
                kind:kind,
                
                isFavorite:isFavorite,
                problemDetails:kind==='problem'?problemDetails:undefined,
                resourceDetails: kind === 'resource' ? resourceDetails : undefined
        });
        return {
                entry:response,
                message:"entry created successfully"
        }

}

const updateEntry=async (entryData)=>{
        // validate object
        if (
        !entryData ||
        typeof entryData !== 'object' ||
        Array.isArray(entryData)
        ) {
        throw createError(400, 'Invalid request data.');
        }
        const{userID,notebookID,entryID,updates}=entryData;
        // validate update field
        if (
                !updates ||
                typeof updates !== 'object' ||
                Array.isArray(updates) ||
                Object.keys(updates).length === 0
        ) {
        throw createError(400, 'No valid updates provided.');
        }
         const allowedFields = [
        'title',
        'description',
        'content',
        'contentFormat',
        'kind',
        'isFavorite',
        'problemDetails',
        'resourceDetails'
        ];
        const unsupportedFields=Object.keys(updates).filter(
                field=>!allowedFields.includes(field)
        );
        if(unsupportedFields.length>0){
                throw createError(400,`Unsupported update fields: ${unsupportedFields.join(',')}`);

        }
        // find existing entry
        const prevEntry=await Entry.findOne({
                _id:entryID,
                user:userID,
                notebook:notebookID
        });
        
        if(!prevEntry){
                throw createError(404,"Entry to be updated does not exist.");
        }

        const curEntry={
                ...prevEntry.toObject(),
        };
        const kindChanged = updates.kind !== undefined && updates.kind !== prevEntry.kind;
        if(kindChanged){
                curEntry.problemDetails=undefined;
                curEntry.resourceDetails=undefined;
        }
        Object.assign(curEntry, updates);
       if(!kindChanged){
                
                    if (
                        curEntry.kind === 'problem' &&
                        updates.problemDetails !== undefined &&
                        updates.problemDetails !== null &&
                        typeof updates.problemDetails === 'object' &&
                        !Array.isArray(updates.problemDetails)
                    ){
                        curEntry.problemDetails={
                                                ...(prevEntry.problemDetails?.toObject?.()||
                                                prevEntry.problemDetails||
                                                {}    
                                                ),
                                                ...updates.problemDetails
                                                }
                    } 

                
                
                    if (
                        curEntry.kind === 'resource' &&
                        updates.resourceDetails !== undefined &&
                        updates.resourceDetails !== null &&
                        typeof updates.resourceDetails === 'object' &&
                        !Array.isArray(updates.resourceDetails)
                    ){
                        curEntry.resourceDetails = {
                                                        ...(prevEntry.resourceDetails?.toObject?.() ||
                                                        prevEntry.resourceDetails ||
                                                        {}),
                                                        ...updates.resourceDetails
                                                  };
                     }    
                
       } 
        
        verifyEntryFields(curEntry);
        curEntry.title = curEntry.title.trim();
        curEntry.description = (curEntry.description ?? '').trim();
        curEntry.content = (curEntry.content ?? '').trim();
        // assign permitted fields
        prevEntry.title = curEntry.title;
        prevEntry.description = curEntry.description;
        prevEntry.content = curEntry.content;
        prevEntry.contentFormat = curEntry.contentFormat;
        prevEntry.kind = curEntry.kind;
        prevEntry.isFavorite = curEntry.isFavorite;

        prevEntry.problemDetails =
                curEntry.kind === 'problem'
                ? curEntry.problemDetails
                : undefined;

        prevEntry.resourceDetails =
                curEntry.kind === 'resource'
                ? curEntry.resourceDetails
                : undefined;

        //  Save
        const updatedEntry = await prevEntry.save();

        return {
                entry: updatedEntry,
                message: 'Entry updated successfully'
        };
}





















module.exports={
        createEntry,
        updateEntry
}