import { Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import Swal from 'sweetalert2';

const DataForm = () => {
   
 let   initialValues = {
        title : '',
        description : '',
        stock : '',
        price : '',
        review : '',
        ratings :'' ,
    };

    const userSubmit = async (formdata) => {
        console.log(formdata);

        // 1. address
        // 2. request method
        // 3. data
        // 4. data format


//  for creating request on backend

        const response = await fetch('http://localhost:5000/data/add', {
                                method: 'POST',
                                body : JSON.stringify(formdata),
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            })
                            
        if(response.status === 200){
            console.log('success');
            Swal.fire({
                icon : 'success',
                title: 'Well Done 👍',
                text: 'You have done a wonderfull Job!!'
            })
            // navigate('/login');
        }else{
            console.log(response.status);
            console.log('something went wrong');
        }
    }

  return (
    <div>
         <h1>Add Product Here</h1>
         <hr></hr>
        <Formik initialValues={initialValues} 
        onSubmit={userSubmit}
        >
            { ( { values, handleChange, handleSubmit } ) => (
                <form onSubmit={handleSubmit}>

                    <TextField style={{width:"60%"}} variant="outlined" label="Title" id="title" onChange={handleChange} value={values.title} />    
                    <TextField style={{width:"60%"}} variant="outlined" label="Description" id="description" onChange={handleChange} value={values.description} />    
                    <TextField style={{width:"60%"}} variant="outlined" label="Stock" id="stock" onChange={handleChange} value={values.stock} />   
                    <TextField style={{width:"60%"}} variant="outlined" label="Price" id="price" onChange={handleChange} value={values.price} />    
                    <TextField style={{width:"60%"}} variant="outlined" label="Review" id="review" onChange={handleChange} value={values.review} />    
                    <TextField style={{width:"60%"}} variant="outlined" label="Rating" id="ratings" onChange={handleChange} value={values.rating} />    

                  <div><Button style={{ marginTop: "10px" }}  variant="contained" type='submit'>Submit</Button></div>  
                </form>
            ) }
        </Formik>
    </div>
  )
}

export default DataForm;