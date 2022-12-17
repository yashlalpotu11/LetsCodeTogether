import React from 'react'
import '../index.css'
function About() {
    return (
        <>
            <div className="main_cont ">
                <div class="card ">
                <div class="text">
                    <img src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg" alt=""/>
                    <h3>Yash Lalpotu</h3>
                    <h5>Student | Competitive Coder</h5>
                   
                        <p style={{fontWeight : "500"}} >
                            Hieee, I'm Yash, a passionate Full Stack Software Developer 🚀 having an experience of building Web applications with JavaScript / Reactjs / Nodejs and some other cool libraries and frameworks.
                        </p>
                
                </div>
                <div class="links">
                    <a target="_blank" href="https://www.linkedin.com/in/yash-lalpotu-92b4931b4/"><i class="fab fa-linkedin"></i></a>
                    <a target="_blank" href="https://github.com/yashlalpotu11"><i class="fab fa-github"></i></a>
                    <a target="_blank" className="text-dark" href="mailto:yashrlalpotu30@gmail.com"><i class="fa fa-envelope"></i></a>
                </div>
                </div>
            </div>
        </>
    )
}

export default About
