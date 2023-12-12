import { useEffect, useState } from "react";
import TitleForm from "../components/TitleForm"
import { useFirestore } from "../hooks/useFirestore";
import Button from "../components/Button";
import { nanoid } from "nanoid";

export const Home = () => {
  const {data, error, loading, getData, addData, deleteData, updateData} = useFirestore()
  const [text, setText] = useState('');
  const [newOriginID, setNewOriginID] = useState()

  useEffect(() => {
    console.log("get data")
    getData();
  }, [])

  if(loading.getData) return <p>Loading getData...</p>
  if(error) return <p>{error}</p>

  const handleSubmit = async(e) => {
    e.preventDefault()

    if(newOriginID){
      await updateData(newOriginID, text)
      setNewOriginID("")
      setText("")
      return
    }

    addData(text)
    setText("")
  }

  const handleClickDelete = async (nanoid) => {
    await deleteData(nanoid);
  }

  const handleClickEdit = (item) => {
    console.log("click edit")
    setText(item.origin)
    setNewOriginID(item.nanoid)
  }

  return (
    <>
        <TitleForm text="Home" />

        <form onSubmit={handleSubmit}>
          <input placeholder="ex: http://example.com" type="text" value={text} onChange={e => setText(e.target.value)} />
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
            <div key={item.nanoid}>
              <p>{item.nanoid}</p>
              <p>{item.origin}</p>
              <p>{item.uid}</p>

              <Button
                type="buttom"
                text="DELETE"
                color="red"
                loading={loading[item.nanoid]}
                onClick={() => handleClickDelete(item.nanoid)}
              />
              <Button
                type="buttom"
                text="EDIT"
                color="cyan"
                onClick={() => handleClickEdit(item)}
              />
            </div>
          ))
        }
    </>
  )
}

export default Home;