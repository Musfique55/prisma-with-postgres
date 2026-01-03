
type Ioptions = {
    page? : number | string;
    limit? :number | string;
    sortBy? : string;    
    sortOrder? : string;
}

type IoptionsResult = {
    skip : number;  
    page : number;
    limit : number;
    sortBy : string;
    sortOrder : 'asc' | 'desc';
}

const paginationSortingHelper = (options : Ioptions) : IoptionsResult => {
    const page =  Number(options.page) || 1;
    const limit = Number(options.limit) || 10;
    const sortBy = options.sortBy || 'created_at';
    const sortOrder = options.sortOrder === 'desc' ? 'desc' : 'asc';
    return {
        skip: (page - 1) * limit,
        page,
        limit,
        sortBy,
        sortOrder
    };
};

export default paginationSortingHelper;