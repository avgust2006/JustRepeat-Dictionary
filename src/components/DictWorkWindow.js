import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Divider,  CardContent, CardActions,IconButton} from '@mui/material';
import {Box, Card, Container, Grid, Stack, styled, Typography} from '@mui/material';
import Button from '@mui/material/Button';
import VolumeUp from '@mui/icons-material/VolumeUp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



/** customising for CSS elementes */

const CssBut=styled(Button)({  //styling for three buttons
width: 124,
color:'#123b4d',
background: 'linear-gradient(135deg, #f2d7aa 0%, #f9f1e1 100%)',
borderRadius: 14,
fontWeight: 800,
boxShadow: '0 12px 20px rgba(18,59,77,0.12)',

'&:hover': {
    background: 'linear-gradient(135deg, #f6ddba 0%, #fff9f2 100%)',
  },

})

const Item = styled(Card)(({ theme }) => ({  //styling for Cards
    
    color:'#123b4d',   
    background: 'linear-gradient(135deg, #fefaf3 0%, #f1e5d1 100%)',
    width: '100%',
    height: 140,
    padding: theme.spacing(1),
    borderRadius: 18,
    border: '1px solid rgba(18,59,77,0.08)',
    boxShadow: '0 18px 28px rgba(18,59,77,0.08)',
      
  }));
  
  const CSSIcon = styled(IconButton)({

    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.18)',
    },
    backgroundColor: 'rgba(255,255,255,0.12)',
    width: '30px',
    height: '30px',
    position: 'absolute', 
       right: '10px', 
       top: '7px',
    color: '#f9f4ef',
    borderRadius: '50%',

  })

/** customising for CSS elementes  **
 * **** end  **************/

const DictWorkWindow =()=> {

/** this two lines of the code handle global variable from Dictionary page*/
  const location = useLocation();
  const { title }= location.state || {}; // Default to an empty object to avoid errors if state is undefined
  const encodedTitle = encodeURIComponent(title || '').replace(/%2B/g, '+');

  const navigate = useNavigate();//this need for routing in React, used futher to return for dictionary page

   
  const [namesMap, setNamesMap] = useState(new Map());
  const [currentKey, setCurrentKey] = useState('');
  const [currentValue, setCurrentValue] = useState('');
  const [currentKeyforParsing, setKeyforParsing]= useState('');
  const [currentValueforParsing, setValueforParsing]= useState('');
  const [transButtonText, setTransButtonText] = useState('Translate');
  const [startButtonText, setStartButtonText] = useState('Start');
  const [TranslateButtonVisible, SetTranslateButtonVisible] = useState(false);
  const [JustRepeatButtonVisible, SetJustRepeatButtonVisible] = useState(false);
  
  /************************************************************************* */
// This lines of code use useEffect hook to download name.txt from a memory in public folder
// parse it and put names from the file into map, line by line
/************************************************************************* */


  useEffect(() => {
    const fetchNames = async () => {
      try {
        // Fetch the text file from the server, send request to the server
         const response = await fetch(`/Dictionary/${encodedTitle}/words.txt`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Read the content of the file as text
        const text = await response.text();

        // Split the text by line breaks or other delimiters and put the text to the map
        const namesArray = text.split('\n').map(name => name.trim()).filter(name => name);
        const map = new Map();
        for (const x of namesArray) {
           for(const y of namesArray){
            if(y.search(x)!==-1 && y.search(x)>0){
              map.set(x,y);
              map.set(y,x);
            }
           }
        }

        // Update the state with the array of names
        
        setNamesMap(map); //set  namesMap variable
      } catch (error) {
        console.error('Error fetching or processing the names file:', error);
      }
    };

    fetchNames();
  }, [title]); // Empty dependency array means this effect runs once on mount 


/************************************************************************* */
/**  end of the code */
/************************************************************************* */

/** This code of handle 'Translate/Next' button */

const TranslateButtonClick =()=>{

   if (namesMap.size!==0){

   if(transButtonText === "Translate"){

    /******playing the random audio file***********/

    const audioUrl = `/Dictionary/${ encodedTitle }/${currentValueforParsing}`;
    let audio = new Audio(audioUrl);
    audio.play().catch(error => console.error('Error playing audio:', error));

    /******************************************************* */

     /** This part of code is necessary for correct output name of the words
       * in the text field (card/ paper). I remove .wav from the string and divide
       * russian and english words. Also I remove "1" symbol from the start of the name string
       */
     if (currentKeyforParsing.length > currentValueforParsing.length){
      let randomValue ="" ; 
      //remove .wav from value and then remove 1
      randomValue= currentValueforParsing.substring(0,currentValueforParsing.indexOf(".wav"));
     // randomValue =currentKeyforParsing.substring(0,currentKeyforParsing.search(currentValueforParsing)) ;
      if(randomValue.startsWith("1")){
        randomValue=randomValue.substring(1);
     }
     setCurrentValue(randomValue);
     }else{
      //look for in the current value the current key and displaying the russian word
       let text="";
      text=currentValueforParsing.substring(0,currentValueforParsing.indexOf(currentKeyforParsing));
      
      setCurrentValue(text);
     }  
      
     setTransButtonText('Next');
     namesMap.delete(currentKeyforParsing);
     /*******************************************************************
      */

   }else{

   /**take random key/value from namesMap*/
   const keys = Array.from(namesMap.keys());
   let randomKey = keys[Math.floor(Math.random() * keys.length)];
   const value = namesMap.get(randomKey);

   //setCurrentKey(randomKey);
   setKeyforParsing(randomKey);

    /******playing the random audio file***********/

    const audioUrl = `/Dictionary/${ encodedTitle }/${randomKey}`;
    let audio = new Audio(audioUrl);
    audio.play().catch(error => console.error('Error playing audio:', error));

   /************************************************************ */

    /** This part of code is necessary for correct output name of the words
       * in the text field (card/ paper). I remove .wav from the string and divide
       * russian and english words. Also I remove "1" symbol from the start of the name string
       */
    if (randomKey.length > value.length){
         
      randomKey =randomKey.substring(0,randomKey.search(value)) ;
      
     }else{
       let text="";
      text=randomKey.substring(0,randomKey.indexOf(".wav"));
      
      if(text.startsWith("1")){
        text=text.substring(1);
     }

       randomKey=text;
     }  

     /*******************************************************************
      */
     setCurrentKey(randomKey);//set currentKey variable
     setCurrentValue(''); // becouse we need that textfield(card/paper) would be empty before writing the translated word
     setTransButtonText('Translate');
     setValueforParsing(value);


   } 
    
   } else{

     /** If we finished all list of the words that return to 'Dictionary' page */
     navigate('/home');
   }
}
 
 /**End of 'Translate/Next' handling code */ 

 /**
  * This code for handling Start/Finish button click
  */

const StartButtonClick=()=>{

  if (namesMap.size!==0){
     if (startButtonText === "Start"){
     /**take random key/value from namesMap*/
       const keys = Array.from(namesMap.keys());
       let randomKey = keys[Math.floor(Math.random() * keys.length)];
       const value = namesMap.get(randomKey);
       setKeyforParsing(randomKey);

       /******playing the random audio file***********/

       const audioUrl = `/Dictionary/${ encodedTitle }/${randomKey}`;
       let audio = new Audio(audioUrl);
       audio.play().catch(error => console.error('Error playing audio:', error));

      /************************************************************ */


      /** This part of code is necessary for correct output name of the words
       * in the text field (card/ paper). I remove .wav from the string and divide
       * russian and english words. Also I remove "1" symbol from the start of the name string
       */
       if (randomKey.length > value.length){
         
        randomKey =randomKey.substring(0,randomKey.search(value)) ;
        
       }else{
         let text="";
        text=randomKey.substring(0,randomKey.indexOf(".wav"));
        if(text.startsWith("1")){
          text=text.substring(1);
       }
      
         randomKey=text;
       }  

       /*******************************************************************
        */
       setCurrentKey(randomKey);
       setCurrentValue(''); // becouse we need that textfield(card/paper) would be empty for first word
       setStartButtonText('Dictionary');
       setValueforParsing(value);
       SetTranslateButtonVisible(true);
       SetJustRepeatButtonVisible(true);

     }else{

     /** if start button set for "Dictionary" that return to 'Dictionary' page */
      navigate('/home');
      setNamesMap(new Map());
     }
   
    }

}

 /** End of lines of the Start/Finish button ckick */

 /**
  * This function need for   repeat IconbuttonWord handling
  */

const IconButtonWordClick=()=>{

if (currentKey!==''){
  const audioUrl = `/Dictionary/${ encodedTitle }/${currentKeyforParsing}`;
  let audio = new Audio(audioUrl);
  audio.play().catch(error => console.error('Error playing audio:', error));
} 

}

/**End off repeat Iconbutton click lines of codes */

/**
  * This function need for   repeat IconbuttonTranslate handling
  */

const IconButtonTranslateClick=()=>{

  if (currentValue!==''){
    const audioUrl = `/Dictionary/${ encodedTitle }/${currentValueforParsing}`;
    let audio = new Audio(audioUrl);
    audio.play().catch(error => console.error('Error playing audio:', error));
  } 
  
  }
  
  /**End off repeat Iconbutton click lines of codes */

/**
  * This function need for handling JustRepeat button click
  */

const JustRepeatButtonClick=()=>{
  
  navigate('/');
  setNamesMap(new Map());

}




/**End of JustRepeat button click lines of codes */


/**
  * This function need for handling click on return button 
  */
const IconButtonReturnClick3=()=>{

  navigate('/home'); 
  
  }
/**End of return button click  */

return (

/** top of the work window, including box before divider
 * box for JR icon and caption of dictionary isplaying
 * ********* */    
        <Container maxWidth="md" sx={{ pb: 4, width: '100%' }}>
           <Box sx={{marginTop: { xs: 8, md: 12 }, marginLeft: 0, marginRight:0, background: 'linear-gradient(90deg, #123b4d 0%, #1f5b71 100%)',
               display: 'flex',
              flexDirection:'row',
              flexWrap:'wrap',
              position: 'relative',
                height: '54px',
                borderRadius: '18px 18px 0 0',
                px: 2,
                boxShadow: '0 18px 30px rgba(18,59,77,0.12)',
           }} >

            <Box sx={{
      position: 'absolute', 
        left: '12px', 
        top: '11px', 
        width: '30px',
        height: '30px',
        borderRadius: '50%',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
        background: 'linear-gradient(135deg, #f2d7aa 0%, #f9f1e1 100%)', 
        color: '#123b4d',
        fontSize: '14px',
        fontWeight: 900,
        letterSpacing: '0.04em',
  }}
  >   
              JR
              </Box>

            <Typography gutterBottom variant ="body1" sx={{mx:'auto', mt:'15px', color:'#f9f4ef', fontSize:'14px', textTransform:'uppercase', letterSpacing: 1.6, fontWeight: 800 }}  > 
              {title}
            </Typography>
            <CSSIcon aria-label='return'  onClick={IconButtonReturnClick3}>
        <ArrowBackIcon fontSize="small"/>  
  </CSSIcon>
         
        </Box>

  {/**  ******************************************************************************  */}

  {/** Box for main work window 
   * ***************************** ****
  */}
          <Box sx={{  marginLeft: 0, marginRight:0, background: 'linear-gradient(180deg, rgba(255,255,255,0.78) 0%, rgba(240,236,226,0.9) 100%)',marginBottom:10,
               display: 'flex',
               flexDirection:'column',
               borderRadius: '0 0 18px 18px',
               boxShadow: '0 18px 30px rgba(18,59,77,0.08)',
               p: { xs: 1.5, md: 2 },
               alignItems: 'center',
         }} >
       
       {/** Start code of displaying Word/Translate windows */}
       <Grid
         container
         sx={{
           width: '100%',
           display: 'grid',
           gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
           gap: '20px',
           px: '5px',
         }}
       >
         {/** Displaying Word window */}
         <Grid sx={{ gridColumn: 'span 1', minWidth: 0 }}>
           <Item
             sx={{
              
               marginTop: '30px',
               display: 'flex',
               flexDirection: 'column',
             }}
           >
             <CardContent
               sx={{
                 display: 'flex',
                 flex: 1,
                 alignItems: 'center',
                 justifyContent: 'center',
                 textAlign: 'center',
                 minWidth: 0,
                 minHeight: 0,
                 overflow: 'hidden',
                 px: 1,
                 py: 1,
               }}
             >
               <Typography
                 sx={{
                   width: '100%',
                   minWidth: 0,
                   fontSize: { xs: '14px', sm: '20px', md: '32px' },
                   lineHeight: 1.15,
                   whiteSpace: 'nowrap',
                   overflow: 'hidden',
                   textOverflow: 'ellipsis',
                 }}
               >
                 {currentKey}
               </Typography>
             </CardContent>

             <CardActions sx={{ justifyContent: 'flex-start', mt: 'auto', p: 0 }}>
               <IconButton aria-label='repeat' onClick={IconButtonWordClick} sx={{ color: '#116A7B', bgcolor: '#CDC2AE' }}>
                 <VolumeUp />
               </IconButton>
             </CardActions>
           </Item>
         </Grid>

         {/** Displaying Translate window */}
         <Grid sx={{ gridColumn: 'span 1', minWidth: 0 }}>
           <Item
             sx={{
               marginTop: '30px',
               display: 'flex',
               flexDirection: 'column',
             }}
           >
             <CardContent
               sx={{
                 display: 'flex',
                 flex: 1,
                 alignItems: 'center',
                 justifyContent: 'center',
                 textAlign: 'center',
                 minWidth: 0,
                 minHeight: 0,
                 overflow: 'hidden',
                 px: 1,
                 py: 1,
               }}
             >
               <Typography
                 sx={{
                   width: '100%',
                   minWidth: 0,
                   fontSize: { xs: '14px', sm: '20px', md: '32px' },
                   lineHeight: 1.15,
                   whiteSpace: 'nowrap',
                   overflow: 'hidden',
                   textOverflow: 'ellipsis',
                 }}
               >
                 {currentValue}
               </Typography>
             </CardContent>

             <CardActions sx={{ justifyContent: 'flex-start', mt: 'auto', p: 0 }}>
               <IconButton aria-label='repeat' onClick={IconButtonTranslateClick} sx={{ color: '#116A7B', bgcolor: '#CDC2AE' }}>
                 <VolumeUp />
               </IconButton>
             </CardActions>
           </Item>
         </Grid>
       </Grid>

   {/**   End of Displaying Translate window */}

   {/** Start of displaying managing buttons. I use stack component of MUI components*/}
    <Stack 
direction={{xs:'column',sm: 'row', md:'row'}}
spacing={{xs:1, sm:4, md:6}}
sx={{ marginTop: '40px', marginBottom:'10px', width: '100%', justifyContent: 'center', alignItems: 'center' }}
>
<CssBut variant="contained" 
sx={{ visibility: JustRepeatButtonVisible ? 'visible' : 'hidden' }}  // Makes the button invisible but retains its space in the layout
onClick={JustRepeatButtonClick}
>JustRepeat</CssBut>   
<CssBut variant="contained" onClick= {StartButtonClick}>{startButtonText}</CssBut>
<CssBut variant="contained" 
sx={{ visibility: TranslateButtonVisible ? 'visible' : 'hidden'  }}  // Makes the button invisible but retains its space in the layout
onClick= {TranslateButtonClick}>{transButtonText}</CssBut>   
    </Stack>
 
  </Box>
</Container>
   

);

};


export default DictWorkWindow;