import React, { useState } from 'react'
import * as bibFileParser from 'bibtext-file-info'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import '../App.css'
/**
 * props
 *  -> title
 *  -> url
 *  -> paperId
 *  -> abstract
 *  -> bibtex
 */

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
)

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px  #000',
  boxShadow: 24,

  p: 4,
}

// citations
export default function DataCard(props) {
  function parseBibtext(data) {
    return bibFileParser.parse(data)
  }

  function generateIEEE(data) {
    return `${data.authors.join(', ')}, ${data.title}, ${data.bookTitle} ${
      data.year
    }`
  }

  function generateAPA7(data) {
    return `${data.authors.join(', ')}. (${data.year}). ${data.title}. ${
      props.url
    }`
  }

  function generateMLA9(data) {
    return `${data.authors.join(', ')}. ${data.title}, ${data.bookTitle}, ${
      data.year
    }, ${data.pages}`
  }

  function generateHardvard(data) {
    return `${data.authors.join(', ')}, ${data.year}, ${data.title}, ${
      data.bookTitle
    }, Available at: ${props.url}`
  }

  const [ieee, setIeee] = useState('')
  const [apa7, setApa7] = useState('')
  const [harvard, setHarvard] = useState('')
  const [mla9, setMla9] = useState('')

  useState(() => {
    console.log(props.bibtex)
    try {
      const parsed = parseBibtext(props.bibtex)
      //   console.log(parsed)
      setIeee(generateIEEE(parsed))
      setApa7(generateAPA7(parsed))
      setHarvard(generateHardvard(parsed))
      setMla9(generateMLA9(parsed))

      console.log({
        ieee: generateIEEE(parsed),
        apa7: generateAPA7(parsed),
        mla9: generateMLA9(parsed),
        harvard: generateHardvard(parsed),
      })
    } catch (error) {
      console.info('error')
    }
  }, [])

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [value, setValue] = React.useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <Card className="datacard" variant="outlined">
        <CardContent className="content">
          <Typography className="id" sx={{ fontSize: 14 }} gutterBottom>
            Paper ID: {props.paperId}
          </Typography>
          <Typography variant="h5" component="div">
            {props.title}
          </Typography>
          <br />
          {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography> */}
          <Typography className="abstract" variant="body2">
            {props.abstract}
          </Typography>
          <div className="cardbutton">
            <CardActions>
              <Button size="small" href={props.url} target="_blank">
                Get content
              </Button>
            </CardActions>
            <Button
              className="modalbutton"
              size="small"
              variant="contained"
              onClick={handleOpen}
            >
              Cite
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="modalbox" sx={style}>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                  <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                      >
                        <Tab label="IEEE" value="1" />
                        <Tab label="APA7" value="2" />
                        <Tab label="MLA9" value="3" />
                        <Tab label="Harvard" value="4" />
                      </TabList>
                    </Box>
                    <TabPanel value="1">{ieee}</TabPanel>
                    <TabPanel className="panel" value="2">
                      {apa7}
                    </TabPanel>
                    <TabPanel value="3">{mla9}</TabPanel>
                    <TabPanel className="panel" value="4">
                      {harvard}{' '}
                    </TabPanel>
                  </TabContext>
                </Box>
              </Box>
            </Modal>
          </div>
        </CardContent>
      </Card>
      <br />
    </>
  )
}
