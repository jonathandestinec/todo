"use client"

import React, { useEffect, useState } from 'react'
import { GetUser } from '@/utils/auth/getUser'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'
import { ScrollArea } from '@/components/ui/scroll-area'
import { GetTodos } from '@/utils/todo/getTodos'
import { AddTodo } from '@/utils/todo/addTodo'
import { CheckTodo } from '@/utils/todo/checkTodo'
import { DeleteTodo } from '@/utils/todo/deleteTodo'
import { useToast } from "@/components/ui/use-toast"


function page() {

  const [user, setUser] = useState<User | null>()

  const [checked, setChecked] = useState(true)

  const [checkingAuth, setCheckingAuth] = useState(true)

  const [todoText, setTodoText] = useState("")

  const [todos, setTodos] = useState([])

  const [isLoading, setIsLoading] = useState(true)

  const [allChecked, setAllChecked] = useState(false)

  const router = useRouter()

  // Initialize Toast
  const { toast } = useToast()


  // Get all todos

  async function getTodos() {
    const { data, error } = await GetTodos()

    if (error) {
      alert(error.message)
    } else {
      setTodos(data)
      setIsLoading(false)
    }
  }

  async function addTodo() {

    if (todoText != "") {

      setIsLoading(true)

      const { error } = await AddTodo(todoText)

      if (error) {
        toast({
          title: "Error!",
          description: error.message,
          variant: "destructive"
        })
      } else {
        // Get the todos
        getTodos()
      }
    }

    else {
      toast({
        title: "Empty Input",
        description: "Please enter a todo",
        variant: "destructive"
      })
    }
  }

  const isAuth = async () => {
    const user = await GetUser()

    if (user) {
      setUser(user.user)
      setCheckingAuth(false)
      getTodos()
    }
  }

  const handleCheck = async (id: number, checked: boolean) => {

    // set Todo as checked
    console.log()

    const { error } = await CheckTodo(id, checked ? false : true)

    if (error) {
      toast({
        title: "Error!",
        description: error.message,
        variant: "destructive"
      })
    }

    else {
      // Get the todos again
      getTodos()
    }
  }

  const handleDelete = async (id: number) => {

    const { response } = await DeleteTodo(id)

    console.log(response)
    getTodos()
  }

  useEffect(() => {
    isAuth()
  }, [])

  if (checkingAuth) {
    return (
      <div className=' w-screen h-screen flex items-center justify-center'>
        <p className=' text-2xl text-center font-black font-mono'>Loading...</p>
      </div>
    )
  } else {
    return (
      <div>
        <a className=' text-base font-mono text-blue-500 text-right w-screen flex items-center justify-end pr-10 box-border pt-5 pb-5' href="/api/auth/logout">Signout</a>
        <h1 className=' text-2xl text-center font-bold'>Home Page</h1>

        <div className=' md:w-2/3 w-4/5 h-14 ml-auto mr-auto flex items-center justify-center gap-5 mt-10'>
          <input type="text" placeholder='Add todo' className=' w-3/4 pl-5 pr-5 h-full ring-1 ring-black focus:ring-2 outline-none rounded-lg ease-in-out transition duration-100 text-lg' onChange={(e) => {
            setTodoText(e.target.value)
          }} />
          <button className=' w-1/4 h-full text-center rounded-lg bg-black text-white text-lg' onClick={addTodo}>Add</button>
        </div>

        <ScrollArea className="h-[20rem] md:w-2/3 w-4/5 rounded-md border p-4 pt-10 ml-auto mr-auto mt-10">

          {/* Todos */}

          {
            isLoading ? (
              (
                <div className=' w-full h-full ml-auto mr-auto flex items-center justify-center'>
                  <p className=' font-mono text-2xl text-center'>Loading...</p>
                </div>
              )
            ) : (
              todos[0] === undefined ? (
                <div className=' w-full h-full ml-auto mr-auto flex items-center justify-center'>
                  <p className=' font-mono text-2xl text-center'>You have no todo here 📝🖋️</p>
                </div>
              ) : (
                todos.map((todo: { todo: string, completed: boolean, id: number }) => {
                  return (
                    <div className=' flex items-center justify-between md:w-3/4 pr-5 w-5/6 box-border ml-auto mr-auto mb-8 first:font-extrabold' key={todo.id}>
                      {todo.completed ?
                        (<s className=' text-2xl'>{todo.todo}</s>) :
                        (<p className={`text-2xl`}>{todo.todo}</p>)
                      }
                      <div className=' flex items-center justify-center gap-10'>

                        {/* Check box */}
                        <i className={`fi ${todo.completed ? "fi-sr-checkbox" : "fi-rr-checkbox"} text-2xl flex items-center justify-center cursor-pointer`} onClick={() => {
                          handleCheck(todo.id, todo.completed)
                        }}></i>

                        {/* Delete Todo */}

                        <i className="fi fi-rr-trash text-2xl flex items-center justify-center cursor-pointer" onClick={() => {
                          handleDelete(todo.id)
                        }}></i>

                      </div>
                    </div>
                  )
                })
              )
            )
          }

        </ScrollArea>

      </div>
    )
  }
}

export default page