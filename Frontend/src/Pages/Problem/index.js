import React, { useState, useEffect } from 'react';
import SideBar from '../../Components/SideBar';
import Navbar from '../../Components/Navbar';
import {useParams} from 'react-router-dom';
import { BASE_URL } from '../../Constants';
import CodeEditor from '../../Components/CodeEditor.js';
import axios from 'axios';

const index = () => {
    const {id} = useParams();
    const [openSidebar, setOpenSidebar] = useState(false);
    const [problem, setProblem] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const user = JSON.parse(window.localStorage.getItem("user"));
    const hasSolved = (problem) => {
        return user.solvedProblems.includes(problem._id);
    }
    const fetchProblem = async()=>{
        setLoading(true);
        setError(false);
        try{
            const response = await axios.get(`${BASE_URL}/api/problems/problem/${id}`);
            if(response.status === 200){
                setProblem(response.data.data);
                setLoading(false);
            }
        }catch(error){
            setLoading(false);
            setError(true);
            console.log(error);
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        fetchProblem();
    }, []);
  return (
    <div className='h-screen flex flex-col pt-4 w-full'>
        <div className='w-screen'>
            <Navbar setOpenSidebar={setOpenSidebar}/>
        </div>
        <div className='flex h-full'>
            <SideBar openSidebar={openSidebar}/>
            <div className="mx-4 p-2 overflow-y-auto flex-1 md:ml-52 flex my-4 flex-col gap-6 mt-24 ">
            {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error loading problems</div>
          ) : problem ? (
            <div className='flex flex-wrap h-full gap-2'>
                {/* Problem Description */}
                <div className="md:w-[50%] w-full bg-white rounded-lg border-2 border-black h-full gap-2 flex-col overflow-y-auto">
                    <div className='text-center font-bold text-3xl border-b-4 p-2 border-[#636363]'>{problem.title}</div>
                    <div className='font-bold text-xl px-2 pt-2 underline'>Description:</div>
                    <div className='p-2 font-medium text-xl'>{problem.description}</div>
                    <div className='font-bold text-xl px-2 underline'>Input:</div>
                    <div className='p-2 font-medium text-xl'>{problem.inputFormat}</div>
                    <div className='font-bold text-xl px-2 underline'>Output:</div>
                    <div className='p-2 font-medium text-xl'>{problem.outputFormat}</div>
                    <div className='font-bold text-xl px-2 underline'>Example:</div>
                    <div className='px-2 font-medium text-xl'>{problem.example.input}</div>
                    <div className='px-2 font-medium text-xl'>{problem.example.output}</div>
                    <div className='px-2 pb-2 font-medium text-xl'>{problem.explanation}</div>
                    <div className='font-bold text-xl px-2 underline'>Constraints:</div>
                    <div className='p-2 font-medium text-xl'>{problem.constraints}</div>
                    {problem.notes && (
                        <>
                         <div className='font-bold text-xl px-2 underline'>Notes:</div>
                         <div className='p-2 font-medium text-xl'>{problem.notes}</div>
                        </>
                    )}
                    <div className='font-bold text-xl px-2 underline'>Testcases:</div>
                    <div className='flex w-full p-2 gap-2'>
                        <div className='w-[50%] flex-col'>
                            <div className='px-2 text-lg font-semibold'>Input</div>
                            <textarea className='w-full h-36 resize-none overflow-auto p-2 text-base font-medium border-2 border-black rounded-md' value={problem.testcases.map(testcase => testcase.input).join('\n')} readOnly></textarea>
                        </div>
                        <div className='w-[50%]'>
                        <div className='px-2 text-lg font-semibold'>Output</div>
                            <textarea className='w-full h-36 p-2 resize-none overflow-auto text-base font-medium border-2 border-black rounded-md' value={problem.testcases.map(testcase => testcase.output).join('\n')} readOnly></textarea>
                        </div>
                    </div>
                </div>

                {/* Problem submission */}
                <div className='flex-1 w-full bg-white rounded-lg border-2 border-black h-full gap-2 flex-col overflow-y-auto min-w-96'>
                    <CodeEditor/>
                </div>
            </div>
          ):(
            <div>No problem available for this filter</div>
          )}
            </div>
        </div>
    </div>
  )
}

export default index