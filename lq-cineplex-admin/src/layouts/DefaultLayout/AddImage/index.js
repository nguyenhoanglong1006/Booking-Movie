// import { useCallback, useState } from "react";
// import { makeStyles } from "@mui/material";

// function AddMovie() {
// 	const[logo ,setlogo]= useState("");
// 	const classes = useStyle();
// 	const handleCreateBase64=useCallback(async(e)=>{
// 		const file =e.target.files[0];
// 		const base64 = await convertToBase64(file);
// 		setlogo(base64);
// 		e.target.value ="";
// 	},[])
// 	const convertToBase64 = (file) =>{
// 		return new Promise((resolve,reject)=>{
// 			const fileReader = new FileReader();
// 			if(!file){
// 				alert("Please select img");
// 			}else{
// 				fileReader.readAsDataURL(file);
// 				fileReader.onload=()=>{
// 					resolve(fileReader.result);
// 				}
// 			}
// 			fileReader.onerror=(error)=>{
// 				reject(error);
// 			}
// 		})
// 	}
// 	const deleteImage =(e)=>{
// 		e.preventDefault();
// 		setlogo(null);
// 	};
// 		return (
// 		<div>

// 		</div>
// 	 );

// }

// export default AddMovie;
