"use client"

import { useCreateUser, useGetAllUser } from "@/src/lib/api/generated"
import { useState } from "react";

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
        <div>
            <div>
                <input placeholder="Name" onChange={event => nameChange(event.target.value)}></input>
                <input placeholder="Email" onChange={event => emailChange(event.target.value)}></input>
                <button onClick={submit}>Submit</button>
            </div>


            {users ? users.map(user => <div key={user.email}>{user.email}</div>) : <div>No user Found</div>}
        </div>
    )
}