
    const formatDate=(date_field)=>{
      const date = new Date(date_field);
      const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      return formattedDate;
    }


export default formatDate;