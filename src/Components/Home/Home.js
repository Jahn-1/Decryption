import { Box } from '@mui/system'
import React from 'react'
import LinkCard from '../LinkCard/LinkCard'

export default function Home() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'row', flexWrap: 'wrap', marginTop: '60px' }}>
      <LinkCard 
        image={'https://eludegames.com.au/wp-content/uploads/Game-Symolism-1.jpg'}
        description={'In this game you are given a randomly chosen encrypted text and 27 textfields for each character. Your mission to find the correct substitution for each character where by each letter has a one to one mapping.'}
        title={'Play Game!'}
        buttonTitle={"Decode Someone Else's String!"}
        buttonLink={'/game/play'}
      />
      <LinkCard 
        image={'https://historycouk.s3.eu-west-2.amazonaws.com/s3fs-public/2020-08/codebreaking.jpg'}
        description={'You can use this tool to help yourself figure out what an encoded message says. This is mainly aimed towards substitution cipher encryption.'}
        title={'Decoding Tool!'}
        buttonTitle={"Decode Your Own String!"}
        buttonLink={'/decode'}
      />
      <LinkCard 
        image={'https://cdn1.iconfinder.com/data/icons/life-on-the-web/100/cloud3-512.png'}
        description={"You can encode your own string with a substitution cipher. This can be pushed to the list of encrypted text's and will be available for others to try and crack randomly on the game section (if you so wish)."}
        title={'Contribute :)'}
        buttonTitle={"Add Your Encrypted Text!"}
        buttonLink={'/game/add'}
      />
    </Box>
  )
}
