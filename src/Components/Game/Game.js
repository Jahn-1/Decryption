import { Alert, TextField, Typography, Collapse, LinearProgress, Button, } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useRef, useState } from 'react'
// import { getDatabase, ref, set, query, limitToFirst } from "firebase/database";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";

export default function Game() {
  const [openAlert, setOpenAlert] = useState(false)
  const [collectionList, setCollectionList] = useState([])
  const [encodedOriginal, setEncodedOriginal] = useState([])
  const [encoded, setEncoded] = useState([])
  const [decoded, setDecoded] = useState([])
  const [isDisabled, setIsDisabled] = useState(false)
  const [letterMap, setLetterMap] = useState({})
  const [chars, setChars] = useState(Array(27).fill(''));

  const updateStr = (idx, val) => {
    const charsTemp = chars
    charsTemp[idx] = val
    setChars(charsTemp)

    // setEncoded(encoded.replaceAll(alphabet[idx], val.toLowerCase()))
    const temp = encoded
    // set it back to its original letter if empty.
    if (!val) {
      val = alphabet[idx]
    }
    console.log(val)

    for (let i = 0; i < letterMap[alphabet[idx].toLowerCase()].length; i++) {
      // if (val.toLowerCase() in alphabet.toLowerCase())
      temp[letterMap[alphabet[idx].toLowerCase()][i]] = val.toLowerCase()
    }
    console.log(temp)
    setEncoded([...temp])
  }

  const alphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ']
  console.log(alphabet.toString().toLowerCase())
  // const [outAlpha, setOutAlpha] = useState('zyxwvutsrqponmlkjihgfedcba')
  useEffect(() => {

    const lMap = {}
    encodedOriginal.forEach((val, idx) => {
      if (val in lMap) {
        lMap[val].push(idx)
      } else {
        lMap[val] = [idx]
      }
    })
    setLetterMap(lMap)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [encodedOriginal])

  useEffect(() => {
    console.log('called')
    if (arraysEqual(encoded, decoded) && encoded.length !== 0) {
      setIsDisabled(true)
      setOpenAlert(true)
    } else {
      console.log('no win con')
    }
    console.log()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [encoded])

  useEffect(() => {
    const fun = async () => {
      const db = getFirestore()
      const q = query(collection(db, "encodedCollection"))
      const querySnapshot = await getDocs(q);
      const temp = []
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        temp.push(doc.data())
      });

      const choice = Math.floor(Math.random() * collectionList.length)
      setEncodedOriginal([...temp[choice]['encoded']])
      setEncoded([...temp[choice]['encoded']])
      setDecoded([...temp[choice]['decoded']])
      setCollectionList(temp)
    }

    fun()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const arraysEqual = (a, b) => {
    if (a === b) return true;
    if (a == null || b == null || a.length !== b.length) return false;
  
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  const resetGame = () => {
    const choice = Math.floor(Math.random() * collectionList.length)
    setEncodedOriginal([...collectionList[choice]['encoded']])
    setEncoded([...collectionList[choice]['encoded']])
    setDecoded([...collectionList[choice]['decoded']])
    setChars(Array(27).fill(''))
    // const lMap = {}
    // encoded.forEach((val, idx) => {
    //   if (val in lMap) {
    //     lMap[val].push(idx)
    //   } else {
    //     lMap[val] = [idx]
    //   }
    // })
    // setLetterMap(lMap)
    setIsDisabled(false)
    setOpenAlert(false)
    formRef.current.reset();
  }

  const formRef = useRef()


  return (
    <Box>
      <Box 
        sx={{ 
          marginTop: '64px',  
          '@media(max-width: 870px)': {
            marginTop: '44px',  
          }
        }}
      >
      {
        encoded.length === 0 &&
        <LinearProgress />
      }
      </Box>

      <Box sx={{ marginTop: '10px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '10px', marginTop: '15px' }}>
        <Collapse in={openAlert}>
            <Alert sx={{ mb: 2 }} >
              Congratulations! You got the matching characters :)
            </Alert>
          </Collapse>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-around'}}>
          <Typography sx={{ width: '70%', textAlign: 'center', fontFamily: '"Times New Roman"', fontSize: '20px' }}>
            {encodedOriginal}
          </Typography>
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
                    onChange={(e) => { updateStr(idx, e.target.value); }}
                    value={chars[idx]}
                    disabled={isDisabled || !encodedOriginal.includes(val.toLowerCase())}
                    inputProps={{ maxLength: 1 }}
                  />
                </Box>
              ))}
          </Box>
        </form>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: '25px' }}>
        <Button onClick={resetGame} variant='contained' sx={{ width: '200px' }}>
          Reroll puzzle!
        </Button>
      </Box>
    </Box>

  )
}
