import React, { useEffect, useState } from 'react'
import {Box , Button , TextField, Typography} from '@mui/material'
import { collection, addDoc } from "firebase/firestore";
import { db , auth } from '../Config/firebaseconfig';
import {  doc, updateDoc, deleteDoc, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import {CircularProgress} from '@mui/material';

const TodoApp = () => {
  
  const [inputArray , setInputArray] = useState([])
  const [inputValue , setInputValue] = useState('')
  const [loader , setLoader] = useState(true)

  useEffect(()=>{

    const getDatafromFirestore = async () => {
      
      try {
        const q = query(collection(db, "todo"), where("uid", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          inputArray.push ({
            ...doc.data(),
            docid: doc.id,
          })
          setInputArray([...inputArray])
        });
      }
      catch {
        console.log ('unable to get data from firestore')
      }
      finally {
        setLoader(false)
      }
    }
    
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        getDatafromFirestore();
      } else {
        console.log("User is not logged in.");
      }
    });
  }, [])
  
  const addTodo = async ()=> {
    try {
      const docRef = await addDoc(collection(db, "todo"), {
        input: inputValue,
        uid: auth.currentUser.uid,
      });
      console.log("Document written with ID: ", docRef.id);
      inputArray.push ({
        input: inputValue,
        docid: docRef.id,
        uid: auth.currentUser.uid, 
      })
      setInputArray([...inputArray])
      setInputValue('')
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    
  }

  const deleteTodo = async (item , index)=>{
    try {
      await deleteDoc(doc(db, "todo", item.docid));
      inputArray.splice (index , 1)
      setInputArray([...inputArray])
    } catch {
      console.log ('error in deleting array')
    }
  }
  
  const editTodo = async (item , index)=> {

    const editInput = prompt('Enter Value')

    try {
      const washingtonRef = doc(db, "todo", item.docid);
      await updateDoc(washingtonRef, {
        input: editInput
      });
      inputArray[index].input = editInput
      setInputArray ([...inputArray])
    } catch{
      console.log ('error in updating data')
    }
  }
  
  
  
  
  return (
    <Box className='d-flex flex-column w-100 justify-content-center align-items-center gap-4 pt-5'>
      <Button variant="contained" id='width-setup' className='fs-6 fw-bold'>Welcome to TODOAPP</Button>
      <Box className='input-field-box w-100 d-flex p-2 justify-content-center align-items-center gap-2'>
        <TextField value={inputValue} onChange={(e)=>{setInputValue(e.target.value)}} id="standard-basic" label="Enter Todo" variant="standard" className='custom-textfield-input'/>
        <Button onClick={addTodo} variant="contained" id='width-setup-1' className='custom-button-input fs-6 fw-bold' color='secondary'>Add Todo</Button>
      </Box>
      <Box className='d-flex flex-column gap-3'>
        {loader && <CircularProgress />}
        {inputArray.map((item , index)=>{
          return <Box key={index} className='input-field-box-2 rounded-3 ms-2 me-2 border-3 p-2 d-flex justify-content-center align-items-center gap-1'>
          <Typography variant='p' className='list-p'>{index + 1}. {item.input}</Typography>
          <Button onClick={()=>deleteTodo(item , index)} variant="contained" id='width-setup-2' className='custom-button-delete' color='error'>Delete</Button>
          <Button onClick={()=>editTodo(item , index)} variant="contained" id='width-setup-2' className='custom-button-edit' color='success'>Edit</Button>
        </Box>
        })}
      </Box>
      
    </Box>
  )
}

export default TodoApp
