import { TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useRef, useState } from 'react'
// import { getDatabase, ref, set, query, limitToFirst } from "firebase/database";

export default function Decode() {
  const [encodedOriginal, setEncodedOriginal] = useState([])
  const [decoded, setDecoded] = useState([])
  const [letterMap, setLetterMap] = useState({})

  const updateStr = (idx, val) => {
    // setEncoded(encoded.replaceAll(alphabet[idx], val.toLowerCase()))
    const temp = decoded
    // set it back to its original letter if empty.
    if (!val) {
      val = alphabet[idx]
    }
    console.log(letterMap[alphabet[idx].toLowerCase()])
    for (let i = 0; i < letterMap[alphabet[idx].toLowerCase()].length; i++) {
      // if (val.toLowerCase() in alphabet.toLowerCase())
      temp[letterMap[alphabet[idx].toLowerCase()][i]] = val.toLowerCase()
    }
    console.log(temp)
    setDecoded([...temp])
  }

  const alphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ']
  console.log(alphabet.toString().toLowerCase())
  // const [outAlpha, setOutAlpha] = useState('zyxwvutsrqponmlkjihgfedcba')
  useEffect(() => {

    const lMap = {}
    encodedOriginal.forEach((val, idx) => {
      if (val.toLowerCase() in lMap) {
        lMap[val.toLowerCase()].push(idx)
      } else {
        lMap[val.toLowerCase()] = [idx]
      }
    })
    setLetterMap(lMap)

    setDecoded(encodedOriginal)
    formRef.current.reset()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [encodedOriginal])


  const formRef = useRef()

  return (
    <Box>
      <Box 
        sx={{ 
          marginTop: '74px',  
          '@media(max-width: 870px)': {
            marginTop: '54px',  
          }
        }}
      >
      </Box>

      <Box sx={{ marginTop: '10px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-around'}}>
          <TextField 
            onChange={(e) => { setEncodedOriginal([...e.target.value]) }}
            sx={{ width: '70%', textAlign: 'center', fontFamily: '"Times New Roman"', fontSize: '20px' }}
          >
            {encodedOriginal}
          </TextField>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-around'}}>
          <Typography sx={{ width: '70%', textAlign: 'center', fontFamily: '"Times New Roman"', fontSize: '20px' }}>
            {decoded}
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
                    inputProps={{ maxLength: 1 }}
                  />
                </Box>
              ))}
          </Box>
        </form>
      </Box>
    </Box>

  )
}
