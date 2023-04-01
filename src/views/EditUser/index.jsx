import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useParams, useSearchParams } from "react-router-dom";
import ComponentsWrapper from "../../components/ComponentsWrapper";
import Loader from "../../components/Loader";
import { getAdminById } from "../../services/admin";
import paramsToObject from "../../utils/paramsToObject";
import Content from "./components/Content";
import LeftAside from "./components/LeftAside";
import RightAside from "./components/RightAside";

const EditUser = () => {
    const {id} = useParams()
    const {data, isLoading} = useQuery(['admin', id], () => getAdminById(id))
    const [params, setSearchParams] = useSearchParams()
    const form = useForm({
        mode: 'onChange', 
        defaultValues: data
    })

    useEffect(() => {
        setSearchParams({
            ...paramsToObject(params?.entries()),
            role: data?.position?.id,
            permissions: data?.permissions?.map(permission => permission?.id)?.join(',')
        }, {replace: true})
        form.reset({
            ...data,
            role: data?.position?.id,
            permissions: data?.permissions?.map(permission => permission?.id)
        })
    }, [data])

    return (
        <ComponentsWrapper>
            <LeftAside />
            <Content useForm={form} />
            <RightAside useForm={form} />
        </ComponentsWrapper>
    );
}

export default EditUser;
