import React, { useEffect } from 'react'
import AceEditor from "react-ace";
// Themes
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai"
import "ace-builds/src-min-noconflict/theme-eclipse"
import "ace-builds/src-noconflict/theme-solarized_light"
import "ace-builds/src-noconflict/theme-solarized_dark"
import "ace-builds/src-noconflict/theme-dracula"
import "ace-builds/src-noconflict/theme-tomorrow_night"
import "ace-builds/src-noconflict/theme-twilight"
import "ace-builds/src-noconflict/theme-cobalt"
import "ace-builds/src-noconflict/theme-crimson_editor"
import "ace-builds/src-noconflict/theme-vibrant_ink"


// Languages
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp"
import "ace-builds/src-noconflict/mode-python"
import "ace-builds/src-min-noconflict/mode-javascript"
import 'ace-builds/src-noconflict/mode-csharp'
import "ace-builds/src-min-noconflict/mode-ruby"

// Language Tools
import 'ace-builds/src-noconflict/ext-language_tools'
import "ace-builds/src-noconflict/ext-beautify"


import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import MicIcon from '@material-ui/icons/Mic';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import MicOffIcon from '@material-ui/icons/MicOff';
import { useState } from 'react'
import '../index.css';
import io from 'socket.io-client'
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useParams } from 'react-router-dom';
import { rtc, startBasicCall } from '../Socket/JoinAudio';
const socket = io.connect()


function Editor() {
    // usestate Hooks
    const { roomid } = useParams()
    useEffect(() => {
        socket.emit("join", roomid)
        startBasicCall(roomid)
    }, [])

    const [language, changeLanguage] = useState("c_cpp")
    const [fontsize, changeSize] = useState(16)
    const [theme, changeTheme] = useState("cobalt")
    const [mic, changeMic] = useState(true);
    const [code, setCode] = useState('')
    const [stdin, changeInput] = useState("");
    const [stdout, changeOutput] = useState("");

    // code runners
    const runner = async () => {
        var runnerid = "";
        await fetch('https://api.paiza.io/runners/create?' + new URLSearchParams({
            source_code: code,
            language: (language === "c_cpp") ? "cpp" : language,
            input: stdin,
            longpoll: 'true',
            api_key: 'guest'
        }), { method: "POST" })
            .then(response => response.json())
            .then(json => {
                runnerid = json.id;
            })
        var flag = true;
        while (flag) {

            await fetch('https://api.paiza.io/runners/get_status?' + new URLSearchParams({
                id: runnerid,
                api_key: 'guest'
            }), { method: "GET" })
                .then(response => response.json())
                .then(json => {
                    flag = (json.status !== "completed")
                })
        }

        await fetch('https://api.paiza.io/runners/get_details?' + new URLSearchParams({
            id: runnerid,
            api_key: 'guest'
        }), { method: "GET" })
            .then(response => response.json())
            .then(json => {
                var output = ""
                if (json.stdout !== null && json.stdout !== "") {
                    output += json.stdout
                }
                if (json.stderr !== null && json.stderr !== "") {
                    output += json.stderr
                }
                if (json.build_stderr !== null && json.build_stderr !== "") {
                    output += json.build_stderr
                }

                console.log("hrllo");
                socket.emit('changeOutput', { data: output, roomid: roomid })
                changeOutput(output)
            })
    }

    // Socket Client
    socket.on('codeChange', (data) => {
        setCode(data)
    })

    socket.on('changeLanguage', (data) => {
        changeLanguage(data)
    })

    socket.on('changeInput', (data) => {
        changeInput(data)
    })
    socket.on('changeOutput', (data) => {
        changeOutput(data)
    })

    return (
        <div>
            <div className="row main mt-3 w-100">
                <div className="col-sm-10 main_editor">
                    <AceEditor
                        style={{ width: "auto", height: "500px" }}
                        className="texteditor mx-3"
                        mode={language}
                        width='auto'
                        height="80vh"
                        value={code}
                        fontSize={fontsize}
                        theme={theme}
                        enableLiveAutocompletion="true"
                        name="sourcecode"
                        editorProps={{ $blockScrolling: true, $onScrollLeftChange: true }}

                        onChange={(e) => {
                            setCode(e)
                            socket.emit('codeChange', { data: e, roomid: roomid })
                        }}

                    />
                </div>

                <div className="col-sm-2 mt-1 ">
                    <div className="row">
                        <div className="mx-0 sidebar">
                            <div className="first-section">
                                <div className="language my-4">
                                    <h5>Language</h5>
                                    <Select defaultValue="c_cpp" value={language} className="mw-120" onChange={(e) => {
                                        changeLanguage(e.target.value)
                                        const data = e.target.value
                                        socket.emit('changeLanguage', { data: data, roomid: roomid })
                                    }}>
                                        <MenuItem value={"c_cpp"}>C/C++</MenuItem>
                                        <MenuItem value={"java"}>Java</MenuItem>
                                        <MenuItem value={"python"}>Python</MenuItem>
                                        <MenuItem value={"javascript"}>Javascript</MenuItem>
                                        <MenuItem value={"csharp"}>C#</MenuItem>
                                        <MenuItem value={"ruby"}>Ruby</MenuItem>
                                    </Select>
                                </div>
                            
                                <div className="font my-4">
                                    <h5>Font Size</h5>
                                    <Select defaultValue={16} className="mw-120" onChange={(e) => {
                                        changeSize(e.target.value)
                                    }}>
                                        <MenuItem value={12}>12</MenuItem>
                                        <MenuItem value={14}>14</MenuItem>
                                        <MenuItem value={16}>16</MenuItem>
                                        <MenuItem value={18}>18</MenuItem>
                                        <MenuItem value={20}>20</MenuItem>
                                    </Select>
                                </div>

                            
                                <div className="theme my-4">
                                    <h5>Theme</h5>
                                    <Select defaultValue="cobalt" className="mw-120" onChange={(e) => {
                                        changeTheme(e.target.value)
                                    }}>
                                        <MenuItem value={"github"}>Github</MenuItem>
                                        <MenuItem value={"monokai"}>Monokai</MenuItem>
                                        <MenuItem value={"solarized_light"}>Solarized Light</MenuItem>
                                        <MenuItem value={"solarized_dark"}>Solarized Dark</MenuItem>
                                        <MenuItem value={"cobalt"}>Cobalt</MenuItem>
                                        <MenuItem value={"eclipse"}>Eclipse</MenuItem>
                                        <MenuItem value={"vibrant_ink"}>Vibrant</MenuItem>
                                        <MenuItem value={"dracula"}>Dracula</MenuItem>
                                        <MenuItem value={"crimson_editor"}>Crimson</MenuItem>
                                        <MenuItem value={"tomorrow_night"}>Tomorrow</MenuItem>
                                        <MenuItem value={"twilight"}>Twilight</MenuItem>
                                    </Select>
                                </div>
                            </div>

                            <div className="second-section">
                            <CopyToClipboard text={window.location.href.toString()}>
                            <Tooltip title="Copy Room Link" aria-label="share">
                                <Button className="mx-auto d-flex" id="icons" variant="outlined" color="primary"> <FileCopyOutlinedIcon /></Button>
                            </Tooltip>
                        </CopyToClipboard>
                        <Tooltip title="mic" aria-label="mic">
                            {
                                mic ? <Button className="mx-auto d-flex" id="icons" variant="outlined" color="secondary" onClick={() => {
                                    console.log("otggling")

                                    rtc.localAudioTrack.setEnabled(false)

                                    changeMic(!mic)
                                }}> <MicIcon></MicIcon></Button> :
                                    <Button className="mx-auto d-flex" id="icons" variant="outlined" color="primary" onClick={() => {
                                        console.log("otggling")
                                        rtc.localAudioTrack.setEnabled(true)
                                        changeMic(!mic)

                                    }}> <MicOffIcon></MicOffIcon></Button>
                            }
                        </Tooltip>

                        <Tooltip title="Run Code" aria-label="run">
                            <Button className="mx-auto d-flex" id="icons" variant="outlined" color="primary" onClick={() => { runner() }}> <PlayArrowIcon /></Button>
                        </Tooltip>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-3 mx-1 w-100">

                <div className="col px-0">
                    <h3 className="text-center">Input</h3>
                    <AceEditor
                        style={{ width: "auto", height: "300px" }}
                        className="texteditor m-2"
                        width='auto'
                        height="40vh"
                        fontSize={fontsize}
                        theme={theme}
                        value={stdin}
                        name="stdin"
                        editorProps={{ $blockScrolling: true, $onScrollLeftChange: true }}
                        onChange={(e) => {
                            changeInput(e)
                            socket.emit('changeInput', { data: e, roomid: roomid })
                        }}
                    />
                </div>
                <div className="col px-0">
                    <h3 className="text-center">Output</h3>
                    <AceEditor
                        style={{ width: "auto", height: "300px" }}
                        className="texteditor m-2"
                        width='auto'
                        height="40vh"
                        value={stdout}
                        fontSize={fontsize}
                        theme={theme}
                        name="stdout"
                        editorProps={{ $blockScrolling: true, $onScrollLeftChange: true }}
                        onChange={(e) => {
                            changeOutput(e)
                        }}
                    />
                </div>
            </div>


        </div>
    )
}

export default Editor
