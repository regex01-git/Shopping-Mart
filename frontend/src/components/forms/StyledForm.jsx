import styled from 'styled-components'
export const StyledForm=styled.form`
    max-width:350px;
    width:100%;
    margin:2rem auto;
    
    h2{
        margin-bottom:1rem;
    }
        button,input{
        height:50px;
        width:100%;
        padding:10px 12px;
        outline:none;
        border-radius:5px;
        border:1px solid rgb(220,220,220);
        margin-bottom:1rem;
        }
        button{
        padding-bottom:6px;
        background-color:green;
        color:white;
        &:focus{
        border:1px solid rgb(0,208,255)
        }
        }

`;