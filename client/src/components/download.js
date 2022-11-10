import React from 'react'
import FileDownload from "js-file-download"
import axios from 'axios';

const FileDownloader=(props)=> {
    const {data} = props;

    const handleDownload=(e)=>{

        let name =e.target.parentElement.children[0].innerText

         axios({
            url:`http://localhost:8080/download/${name}`,
            method:"GET",
            responseType:"blob"
        }).then((res)=>{
            FileDownload(res.data , name)
        }).catch((e)=>{
            console.log(e)
        })
    }
  return (
    <div className='tableholder'>

        <table className='table'>
       <tbody>
       {
                data.map((data, key)=>{
                    return(
                        <tr key={key}>
                            <td className='table_file_name'>{data.file}</td>
                            <td className='table_downloader' onClick={handleDownload}>
                            DOWNLOAD
                            </td>
                        
                        </tr>
                    )

                })
            }
       </tbody>
        </table>

    </div>
  )
}

export default FileDownloader