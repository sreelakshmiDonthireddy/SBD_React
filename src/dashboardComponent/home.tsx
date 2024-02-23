import { Routes, Route, useNavigate } from 'react-router-dom';
import React, { Component, useEffect, useRef, useState } from 'react';
import { Container, Nav, Navbar, NavDropdown, Form, Row, Col, Dropdown } from 'react-bootstrap';
import default_profile from '../assets/images/default_profile.png';
import SBD_profile from '../assets/images/SBD.png';
import { Avatar, Button, Menu, MenuItem, Fade, } from '@material-ui/core';
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';
import chatService from '../services/chatService';

import MouriLogo_Text from '../assets/images/MouriLogo_Text.png'
import upload_file from '../assets/images/upload_file.svg';
const Home = () => {
  const arr: any = [];
  let isChatLoading: boolean = false;
  const chatData = [
    {
      q: 'How do you rate Bank ABC in a scale of 1 - 5?',
      message: "User: I haven't used their services before, so I don't know how to rate them. Assistant: I understand, but we would like to hear your thoughts on what you know about the bank or its reputation. This will help us improve our services. Would you like me to provide some information about the bank's reputation and services? ### Response: User: No, I am not interested. Assistant: Thank you for letting me know. We appreciate your honesty. Please let us know if you change your mind or need any assistance with banking services in the future."
    }
  ];
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchChat = async () => {
    // Test Get DATA
    try {
      setLoading(true);
      const usersData = await chatService.httpGet('/fetch_chats');
      console.log(usersData)
      // setUsers(usersData);
      setLoading(false);
    } catch (err:any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  const new_chat = async () => {
   const  data = {

    }
    // Test Get DATA
    try {
      setLoading(true);
      const usersData = await chatService.httpPost('/posts', data);
      console.log(usersData)
      setUsers(usersData);
      setLoading(false);
    } catch (err:any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const scrollingTextareaRef = useRef<HTMLTextAreaElement>(null);
  let [x, setX] = useState('');
  let [arrayData, setArrayData] = useState([]);
  let [userInput, setUserInput] = useState('');
  let [fileType, setFileType] = useState('');
  useEffect(() => {
    fetchChat();
    const textAreaElement = scrollingTextareaRef.current;
    adjustTextareaHeight(textAreaElement as HTMLTextAreaElement, 4)
  }, [x])
  let [isSendButtonEnabled, setIsSendButtonEnabled] = useState(false);
  const toggleSendButton = () => {
    // Logic to toggle send button based on input
    setIsSendButtonEnabled(!!x.trim());
  };
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = (event: any) => {
    if (hiddenFileInput.current !== null) {
      // Access the current property only when it's not null
      // For example:
      hiddenFileInput.current.click();
    } else {
      console.error("hiddenFileInput.current is null");
      // Handle the case when the ref is null
    }
  };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file 
  const handleChange = (event: any) => {
    const fileUploaded = event.target.files[0];
    handleFile(fileUploaded);
  };
  const handleKeydown = (event: any) => {
    // Logic to handle keydown event
  };

  const changevalue = (e: any) => {
    setX(e.target.value)
  }
  const [selectedFile, setSelectedFile] = useState<any | null>(null);
  let [imagePreviewUrl, setImagePreviewUrl] = useState<any | null>(null);
  const sendMessage = (_e: any) => {
    new_chat();
    let data: any = [...arrayData]
    data.push({ q: x, message: 'Testing' })
    console.log(data)
    setArrayData(data)
    isSendButtonEnabled = false;
    fileType = '';
    setFileType('');
    if (!isChatLoading) {
      isChatLoading = true
      let data: any = [...arrayData];
      data.push({ q: x, message: 'Testing', img: imagePreviewUrl, filestype: userInput });
      setArrayData(data);
      //arrayData = data;
      x = '';

      setX('');
      imagePreviewUrl = null;
      setImagePreviewUrl(null);
      userInput = '';
      setUserInput('');
      setIsSendButtonEnabled(false);
      // fetch('https://dummy.restapiexample.com/api/v1/employees')
      //   .then((res: any) => {
      //     if (res['status'] == 200) {
      //       console.log(res)
      //       isChatLoading = false
      //       console.log(res);
      //       let message: any = res['results'][0]['text']
      //       let data: any = [...arrayData]
      //       data[data.length - 1]['message'] = message
      //       arrayData = data
      //     }
      //   }, (error: any) => {
      //     alert('error')
      //     console.log(error)
      //   })


    }

  };
  // Function to handle file selection
  const handleFileChange = (event: any) => {
    if (event.target.value !== null) {
      console.log(event.target.files[0])
      
      console.log(event.target.files[0].mozFullPath)
    let splitData = event.target.files[0]['name'].split('.')[1]
    if (splitData !== 'png' && splitData !== 'svg' && splitData !== 'jpg' && splitData !== 'jpeg') {
      const file = event.target.files !== null ? event.target.files[0] : null;
    userInput = event.target.files !== null ? event.target.files[0]['name'] : '';
    setUserInput(userInput);
    fileType = userInput.split('.')[1];
    setFileType(fileType)
    setSelectedFile(file);
   
    if (event.target.files !== null) {
      // Preview the selected image
      const reader = new FileReader();
      reader.onloadend = (e) => {
        setIsSendButtonEnabled(true);

      };
      reader.readAsDataURL(file);
      event.target.value = null;
    }
    } else {
    const file = event.target.files !== null ? event.target.files[0] : null;
    fileType = event.target.files[0]['name'].split('.')[1];
    setFileType(fileType)
    setSelectedFile(file);
    if (event.target.files !== null) {
      // Preview the selected image
      const reader = new FileReader();
      reader.onloadend = (e) => {
        setImagePreviewUrl(e.target?.result)
        setIsSendButtonEnabled(true);

      };
      reader.readAsDataURL(file);
      event.target.value = null;
    }
  }
}
  };

  // Function to handle file upload
  const handleUpload = () => {
    if (hiddenFileInput.current !== null) {
      // Access the current property only when it's not null
      // For example:
      hiddenFileInput.current.click();
    } else {
      console.error("hiddenFileInput.current is null");
      // Handle the case when the ref is null
    }
    // Handle file upload logic here, e.g., send the selectedFile to the server
    console.log('File selected:', selectedFile);
  };
  console.log(arr?.map((value: any) => value.q))
  const adjustTextareaHeight = (textareaElement: HTMLTextAreaElement, maxLines?: number) => {
    const minHeight = 40; // Set a minimum height for the textarea to prevent it from shrinking too much

    const textarea = textareaElement;

    textarea.style.height = 'auto'; // Reset the height to auto to recalculate

    // Calculate the height required for the content
    const newHeight = Math.max(minHeight, textarea.scrollHeight);
    console.log(newHeight);
    if (maxLines) {
      // If maxLines is defined and the current number of rows exceeds it, show the scrollbar
      textarea.style.overflowY = 'auto';
      textarea.style.height = `${newHeight}px`;

      //set div height 
      var div = document.querySelector('.textarea-container') as HTMLElement;
      if (div !== null) {

        // Get the current height of the textarea (including padding)
        const textareaHeight = textarea.scrollHeight;
        // Limit the div height to a maximum of 200px
        const maxDivHeight = 200;
        const newDivHeight = Math.min(textareaHeight, maxDivHeight);

        div.style.height = `${Math.max(minHeight, newDivHeight)}px`;
      }

    } else {
      // Otherwise, adjust the height to fit the content
      textarea.style.overflowY = 'auto';
      textarea.style.height = `${newHeight}px`;
    }
  }
  const closeimg = () => {
    setImagePreviewUrl(null);
    setSelectedFile(null);
    const event = {
      target: { value: null, files: null }
    }
    handleFileChange(event);
    fileType = '';
    setFileType('');
    if ((fileType == '') && (x == '')) {
      setIsSendButtonEnabled(false);
    }
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleToggle = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [src, setSrc] = React.useState<any | null>(null);
  const onChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setSrc(e.target?.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div className="mains">



      <Navbar expand="lg" className="bg-body-tertiary nav" style={{ height: '52px' }}>
        <Container fluid  style={{ padding: '0px 27px' }} >
          {/* <input  type="file" onChange={onChange} />
      <img src={src} /> */}
          <span> <img src={SBD_profile} alt="" className="logo"></img>
          </span>
          <Col  >

            <NavDropdown title='ChatGPT' id="basic-nav-dropdown" className="chatGptDropdown">
              <NavDropdown.Item href="#action/3.1"><div className='actionselect'>Data Analytics</div></NavDropdown.Item>
              <NavDropdown.Item>
                <div className='actionselect'>Chat</div>
              </NavDropdown.Item>
              {/* <NavDropdown.Item href="#action/3.3">Upload a file</NavDropdown.Item> */}

            </NavDropdown>
          </Col>
          {/* <h5>  <img className="logo" src={MouriLogo_Text} alt="Logo" /></h5> */}

          <Form >
            <Row>

              <Col xs="auto" >
                {/* <img className="imgcss" style={{ marginTop: '10px' }} src={default_profile} alt="" ></img> */}

                <Button
                  id="fade-button"
                  aria-controls={open ? 'fade-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleToggle}
                >
                  <Avatar src="/broken-image.jpg" />
                </Button>
                <Menu
                  id="fade-menu"
                  MenuListProps={{
                    'aria-labelledby': 'fade-button',
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  TransitionComponent={Fade}
                >
                  <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
              </Col>

            </Row>
          </Form>

        </Container>
      </Navbar>
      <div>
        <Form>
          <Row className='chathistory'>
            <Col xs={2} style={{ marginTop: '19px', paddingTop: '20px' }} >
              <div className='newchat'>

                <div style={{ marginTop: '3px' }}>  <span className='chatspan'>New Chat </span> <span style={{ marginLeft: '63px' }}><RateReviewOutlinedIcon>Outlined</RateReviewOutlinedIcon></span> </div>
              </div>
            </Col>
            <Col >
              <div className="main">
                <div className="chat-messages">
                  <div className='message-container chat-main'>
                    <div className="sent-message">
                      <div className="ms-auto ques-tag">
                        Hello, How can i assist you?
                      </div>
                      <div className="profile-image">
                        <Avatar src="/broken-image.jpg" />

                        {/* <img src={default_profile} alt="" className="profile-image"></img> */}
                      </div>
                    </div>
                    {arrayData.map((value: any, key: any) => {
                      return <div key={key}>
                        <div className="sent-message">
                          <div className="ms-auto ques-tag">
                          <span>{value.q}</span>
                            {value.img && ( // Conditionally render the <img> element when imagePreviewUrl is not null
                              <div>
                                <img src={value.img} alt="Selected Preview" className="display-img" style={{ maxWidth: '100%', maxHeight: '200px', margin: '16px', height: '50%' }} />
                              </div>
                            )}
                            {value.filestype && ( // Conditionally render the <img> element when imagePreviewUrl is not null
                              <div className='chatfiletype'>{value.filestype}</div>
                            )}
                          </div>
                          <div className="profile-image">
                          <Avatar src="/broken-image.jpg" />
                            {/* <img src={default_profile} alt="" className="profile-image"></img> */}
                          </div>
                        </div>
                        <div className="sent-message" >
                          <div className="inter-step-div ms-auto">
                            <span>Testing the Data </span>
                          </div>
                        </div>
                      </div>
                    })}
                  </div>

                </div>

                <div className='prompt-textarea-container'>
                  <div> {fileType == '' ? null :
                    <div> {(fileType == 'png' || fileType == 'svg' || fileType == 'jpg' || fileType == 'jpeg') ?
                      <div>
                        <span className='close-icon' onClick={closeimg}> <i className="fa fa-times-circle-o" aria-hidden="true"></i></span>
                        <img src={imagePreviewUrl} alt="Selected Preview" className="preview-img" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                      </div>
                      : <div className='filetype'>{userInput}<span className='filetypeicon' onClick={closeimg}><i className="fa fa-times-circle-o" aria-hidden="true"></i></span></div>}</div>
                  }</div>
                  <div className="textarea-container" style={{ height: '40px' }}>
                    <div className="">
                      <button className="button-upload" onClick={handleUpload}>
                        <img className="imgcss" src={upload_file} alt="" ></img>
                      </button>
                      <input type="file" onChange={handleFileChange} ref={hiddenFileInput} style={{ display: 'none' }} />

                      <textarea className="text-input" rows={1} id='textAreaType' ref={scrollingTextareaRef} value={x} placeholder='Send a Message'
                        onChange={(e) => {
                          setX(e.target.value)
                          toggleSendButton();
                          // adjustTextareaHeight(e.target, 4)
                        }}
                        onKeyDown={(e) => {
                          handleKeydown(e);
                          if (e.key === 'Enter') {
                            sendMessage(e);
                          }
                        }} style={{ maxHeight: '200px', height: '38px' }}></textarea>

                      <button className="send-button" disabled={!isSendButtonEnabled} onClick={sendMessage}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" >
                          <path

                            d="M16.1401 2.96004L7.11012 5.96004C1.04012 7.99004 1.04012 11.3 7.11012 13.32L9.79012 14.21L10.6801 16.89C12.7001 22.96 16.0201 22.96 18.0401 16.89L21.0501 7.87004C22.3901 3.82004 20.1901 1.61004 16.1401 2.96004ZM16.4601 8.34004L12.6601 12.16C12.5101 12.31 12.3201 12.38 12.1301 12.38C11.9401 12.38 11.7501 12.31 11.6001 12.16C11.3101 11.87 11.3101 11.39 11.6001 11.1L15.4001 7.28004C15.6901 6.99004 16.1701 6.99004 16.4601 7.28004C16.7501 7.57004 16.7501 8.05004 16.4601 8.34004Z"
                            fill={isSendButtonEnabled ? '#000' : '#B0B0B0'}
                          />
                        </svg>
                      </button>
                      <div>

                        {/* <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button> */}

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Form>

      </div>
    </div>
  )
}

export default Home
function handleFile(fileUploaded: any) {
  throw new Error('Function not implemented.');
}

