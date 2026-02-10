"use client"

import { useCreateUser, useGetAllUser } from "@/src/lib/api/generated"
import { useState } from "react";
import Button from "@mui/material/Button"
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

export function UserContainer (){

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const userGetQuery = useGetAllUser();
    const users = userGetQuery.data;

    const createUserMutation = useCreateUser();

    const nameChange = (name: string) => {
        setName(name);
    }

    const emailChange = (name: string) => {
        setEmail(name);
    }

    const submit = async () => {
        await createUserMutation.mutateAsync({
            data:{
                name: name,
                email:email
            }
        });

        userGetQuery.refetch();
    }


    return (
        <Box display={"flex"} justifyContent={"center"} mt={"auto"}>
        <Paper sx={{p: 5, mt: 20}} >
            <Box display={"flex"} flexDirection={"column"} gap={5}>
                <Box><Input  placeholder="Name" onChange={event => nameChange(event.target.value)}></Input></Box>
                <Box><Input placeholder="Email" onChange={event => emailChange(event.target.value)}></Input></Box>
                <Box><Button variant="contained" onClick={submit}>Submit</Button></Box>
            </Box>


            {users ? users.map(user => <div key={user.email}>{user.email}</div>) : <div>No user Found</div>}
        </Paper>
        </Box>
        
    )
}