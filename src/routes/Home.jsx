import { useEffect, useState } from "react";
import TitleForm from "../components/TitleForm"
import { useFirestore } from "../hooks/useFirestore";
import Button from "../components/Button";
import { formValidate } from "../utils/formValidate";
import FormInput from "../components/FormInput";
import FormError from "../components/FormError";
import { useForm } from "react-hook-form";
import { erroresFirebase } from "../utils/erroresFirebase";

export const Home = () => {
  const [copy, setCopy] = useState({}) 
  const {data, error, loading, getData, addData, deleteData, updateData} = useFirestore()
  const [newOriginID, setNewOriginID] = useState()
  const {required, patternurl} = formValidate();
  const {register, handleSubmit, formState: {errors}, setError, resetField, setValue} = useForm();

  useEffect(() => {
    console.log("get data")
    getData();
  }, [])

  if(loading.getData) return <p>Loading getData...</p>
  if(error) return <p>{error}</p>

  const onSubmit = async({url}) => {

    try {
      if(newOriginID){
        await updateData(newOriginID, url)
        setNewOriginID("")
      } else {
        await addData(url)
      }
      resetField('url')
    } catch (error) {
      const { code, message } = erroresFirebase(error.code)
      setError(code, {message})
    }
  }

  const handleClickDelete = async (nanoid) => {
    await deleteData(nanoid);
  }

  const handleClickEdit = (item) => {
    setValue("url", item.origin);
    setNewOriginID(item.nanoid);
  };

  const handleClickCopy = async(nanoid) => {
    await navigator.clipboard.writeText(window.location.href + nanoid)
    setCopy({[nanoid]: true});
  }

  const pathURL = window.location.href

  return (
    <>
        <TitleForm text="Home" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput 
              label="Ingresa URL"
              type="text" 
              placeholder="https://example.com" 
              {...register("url", {
                  required,
                  pattern: patternurl,
              })}
              error = {errors.url}
          >
              <FormError error={errors.url} />
          </FormInput>
          {
            newOriginID ? (
              <Button
                type="submit"
                text="EDIT URL"
                color="cyan"
                loading={loading.updateData}
              />
            ) : (
              <Button
                type="submit"
                text="ADD URL"
                color="green"
                loading={loading.addData}
              />
            )
          }
        </form>

        {
          data.map((item) => (
            <div key={item.nanoid} className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-2">
              <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{pathURL}{item.nanoid}</p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.origin}</p>
              <div className="flex space-x-2">
                <Button
                  type="buttom"
                  text="Delete"
                  color="red"
                  loading={loading[item.nanoid]}
                  onClick={() => handleClickDelete(item.nanoid)}
                />
                <Button
                  type="buttom"
                  text="Edit"
                  color="cyan"
                  onClick={() => handleClickEdit(item)}
                />
                <Button
                  type="buttom"
                  text={
                    copy[item.nanoid] ? 'Copied' : 'Copy'
                  }
                  color="blue"
                  onClick={() => handleClickCopy(item.nanoid)}
                />
              </div>
              
            </div>
          ))
        }
    </>
  )
}

export default Home;