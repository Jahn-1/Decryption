import { Alert, TextField, Typography, Collapse, Button, } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useRef, useState } from 'react'
// import { getDatabase, ref, set, query, limitToFirst } from "firebase/database";
import { addDoc, collection, getFirestore } from "firebase/firestore";

export default function AddToGame() {
  const [openAlert, setOpenAlert] = useState(false)
  const [encoded, setEncoded] = useState([])
  const [decoded, setDecoded] = useState([])
  const [isDisabled, setIsDisabled] = useState(false)
  const [canSubmit, setCanSubmit] = useState(false)
  const [letterMap, setLetterMap] = useState({})

  const updateStr = (idx, val) => {
    const temp = letterMap
    temp[alphabet[idx].toLowerCase()] = val
    setLetterMap(temp)
    setCanSubmit(false)
  }

  const alphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ']
  console.log(alphabet.toString().toLowerCase())
  // const [outAlpha, setOutAlpha] = useState('zyxwvutsrqponmlkjihgfedcba')
  useEffect(() => {

    const lMap = {}
    alphabet.forEach((letter) => {
      lMap[letter.toLowerCase()] = letter.toLowerCase()
    })
    setLetterMap(lMap)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const fun = async () => {
      // const db = getFirestore()
      // const q = query(collection(db, "encodedCollection"))
      // const querySnapshot = await getDocs(q);
      // const temp = []
      // querySnapshot.forEach((doc) => {
      //   // doc.data() is never undefined for query doc snapshots
      //   console.log(doc.id, " => ", doc.data());
      //   temp.push(doc.data())
      // });

      // setEncodedOriginal([...temp[Math.floor(Math.random() * temp.length)]['encoded']])
      // setEncoded([...temp[Math.floor(Math.random() * temp.length)]['encoded']])
      // setDecoded([...temp[Math.floor(Math.random() * temp.length)]['decoded']])
      // setCollectionList(temp)
    }

    fun()

  }, [])

  useEffect(() => {
    setCanSubmit(false)
  }, [decoded])

  const encode = () => {
    const temp = [...decoded]
    const arr = []
    for (const letter of alphabet) {
      arr.push(letterMap[letter.toLowerCase()])
    }
    if (hasDuplicates(arr)) {
      console.log('has dup"s')
      return
    }

    for (let i = 0; i < decoded.length; i++) {
      const letter =  decoded[i]
      if (letter.toLowerCase() in letterMap) {
        temp[i] = letterMap[letter.toLowerCase()]
      }
    }
    setEncoded(temp)
    setCanSubmit(true)

  }

  const hasDuplicates = (array) => {
    return (new Set(array)).size !== array.length;
}

  const submit = async () => {
    setIsDisabled(true)
    setCanSubmit(false)

    const db = getFirestore()
    await addDoc(collection(db, "encodedCollection"), {
      encoded: encoded.join('').toLowerCase(),
      decoded: decoded.join('').toLowerCase()
    });

    setOpenAlert(true)

  }

  const formRef = useRef()

  return (
    <Box>
      <Box 
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          marginTop: '74px',  
          '@media(max-width: 870px)': {
            marginTop: '54px',  
          }
        }}
      >
        <TextField 
          placeholder='Text to encode'
          multiline
          rows={4}
          fullWidth
          sx={{width:'80%'}}
          onChange={(e) => {setDecoded([...e.target.value])}}
        />
      </Box>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '10px', marginTop: '15px' }}>
          <Collapse in={openAlert}>
              <Alert sx={{ mb: 2 }} >
                Nice! Your encoded puzzle has been added to the collection!
              </Alert>
          </Collapse>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-around'}}>
          <Typography sx={{ width: '70%', textAlign: 'center', fontFamily: '"Times New Roman"', fontSize: '20px' }}>
            {encoded}
          </Typography>
        </Box>

        <form ref={formRef}>
          <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', margin: '0 20px', justifyContent: 'space-around' }}>
              {alphabet.map((val, idx) => (
                <Box sx={{ margin: '0 5px' }}>
                  <Box sx={{ color: 'action.active', mr: 1, my: 2.2, textAlign: 'center' }}>
                    {val}
                  </Box>
                  <TextField 
                    sx={{ width: 40 }} 
                    id="input-with-sx" 
                    label='' 
                    variant="outlined" 
                    onChange={(e) => { updateStr(idx, e.target.value) }}
                    disabled={isDisabled}
                    inputProps={{ maxLength: 1 }}
                  />
                </Box>
              ))}
          </Box>
        </form>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: '25px' }}>
        <Button onClick={encode} variant='contained' sx={{ width: '200px' }} disabled={isDisabled}>
          Encode!
        </Button>
        <Button onClick={submit} color='success' variant='contained' sx={{ width: '200px' }} disabled={!canSubmit}>
          Contribute!
        </Button>
      </Box>
    </Box>

  )
}
