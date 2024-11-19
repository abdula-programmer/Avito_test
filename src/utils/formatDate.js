const formatDate = (time) => {
    const date = new Date(time * 1000);

    const month = date.getMonth()+1;
    const day = date.getDate();
    const year = date.getFullYear();

    
    const formattedDate = `${day}.${month}.${year}`

    return formattedDate;
};

export default formatDate;