import { useState } from "react"
import { StyledForm } from "../../components/forms/StyledForm"
import { useDispatch } from 'react-redux'
import { productsCreate } from "../../features/productsSlice"

export default function CreateProduct() {
    const [productImg, setProductImg] = useState("")
    const [name, setName] = useState("")
    const [brand, setBrand] = useState("")
    const [price, setPrice] = useState("")
    const [desc, setDesc] = useState("")
    const [img,setImg]=useState('')
    console.log(productImg)
    function handleProductImageUpload(e) {
        const file = e.target.files[0]
       
        // console.log("image",image)
        // console.log("hello mr")
        // console.log(file)
        setProductImg(file)
        TransformFile(file)
    }
    const TransformFile = (file) => {
        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                console.log("buffer",reader.result)
                setImg(reader.result)
            }
        } else {
            setProductImg('')
        }
    }
    const dispatch = useDispatch()
    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', productImg);
        formData.append('name', name);
        formData.append('brand', brand);
        formData.append('desc', desc);
        formData.append('price', price);
            console.log("button clicked")
        dispatch(productsCreate(formData));
    }
    return (
        <>
            <h1>Create Product</h1>
            <div style={{ display: "flex" }}>
                <div>
                    <StyledForm className="form" onSubmit={handleSubmit}>
                        <input type="text" placeholder="Enter Product Name" onChange={(e) => setName(e.target.value)} />
                        <input type="text" placeholder="Enter Product Brand" onChange={(e) => setBrand(e.target.value)} />
                        <input type="text" placeholder="Enter Product Price" onChange={(e) => setPrice(e.target.value)} />
                        <input type="text" placeholder="Enter Product Description" onChange={(e) => setDesc(e.target.value)} />
                        <input type="file" accept="image/" onChange={handleProductImageUpload} name="image" />
                        <button>Submit</button>
                    </StyledForm>
                </div>
                <div className="img">
                    {
                        productImg ? <><img src={img} alt="Product image!" /></> : "Image will be show in this tab"
                    }
                </div>
            </div>
        </>
    )
}