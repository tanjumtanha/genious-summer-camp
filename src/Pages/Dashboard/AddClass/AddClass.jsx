//import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../providers/AuthProvider';
//import useAxiosSecure from "../../../hooks/useAxiosSecure";
//import Swal from "sweetalert2";

//const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

const AddClass = () => {
    const {user}=useContext(AuthContext);
    //const [axiosSecure] = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();
    //const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`

    const onSubmit = data => {
        console.log(data)
        // const formData = new FormData();
        // formData.append('image', data.image[0])

        // fetch(img_hosting_url, {
        //     method: 'POST',
        //     body: formData
        // })
        // .then(res => res.json())
        // .then(imgResponse => {
        //     if(imgResponse.success){
        //         const imgURL = imgResponse.data.display_url;
        //         const {name, price, category, recipe} = data;
        //         const newItem = {name, price: parseFloat(price), category, recipe, image:imgURL}
        //         console.log(newItem)
        //         axiosSecure.post('/menu', newItem)
        //         .then(data => {
        //             console.log('after posting new menu item', data.data)
        //             if(data.data.insertedId){
        //                 reset();
        //                 Swal.fire({
        //                     position: 'top-end',
        //                     icon: 'success',
        //                     title: 'Item added successfully',
        //                     showConfirmButton: false,
        //                     timer: 1500
        //                   })
        //             }
        //         })
        //     }
        // })

    };


    return (
        <div className="w-full px-10">
            {/* <SectionTitle subHeading="What's new" heading="Add an item" ></SectionTitle> */}
            <form onSubmit={handleSubmit(onSubmit)} className='p-8 bg-violet-200'>
                <div className="form-control w-full mb-4">
                    <label className="label">
                        <span className="label-text font-semibold">Class Name*</span>
                    </label>
                    <input type="text" placeholder="Class Name"
                        {...register("name", { required: true, maxLength: 120 })}
                        className="input input-bordered w-full " />
                </div>
                <div className="flex my-4 gap-4">
                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text font-semibold">Instructor Name</span>
                        </label>
                        <input type="text" placeholder="Class Name"
                            {...register("instructor")} defaultValue={user?.displayName}
                            className="input input-bordered w-full " readOnly />
                    </div>
                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text font-semibold">Instructor Email</span>
                        </label>
                        <input type="text" placeholder="Class Name"
                            {...register("email")} defaultValue={user?.email}
                            className="input input-bordered w-full " readOnly />
                    </div>
                </div>
                <div className="flex my-4 gap-4">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Available Seat</span>
                        </label>
                        <input type="number" {...register("availableSeats", { required: true })} placeholder="Type here" className="input input-bordered w-full " />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Price</span>
                        </label>
                        <input type="number" {...register("price", { required: true })} placeholder="Type here" className="input input-bordered w-full " />
                    </div>
                </div>
                <div className="form-control w-full my-4">
                    <label className="label">
                        <span className="label-text">Item Image*</span>
                    </label>
                    <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-full " />
                </div>
                <input className="btn btn-sm mt-4 bg-blue-300 hover:bg-blue-500" type="submit" value="Add Class"/>
            </form>
        </div>
    );
};

export default AddClass;