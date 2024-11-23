import { useState } from "react"
import Input from "../../components/inputs"
import Button from "../../components/buttons"

const CommentField = () => {
    const [ showCommentField, setShowCommentField ] = useState(false)
    console.log(showCommentField)
    return (
        <div className="w-full" onClick={() => setShowCommentField(true)}>
            {showCommentField ?
            <div className="relative h-40">
            <Input maxLength={220} type="text-area" style='h-full !border-gray-400 !w-full border !pb-24  !row-3 !column-3' />
            <Button disabled={true} style='!absolute !rounded-full bottom-2 right-1' name='Comment'/>
            </div>
             :
                <div className='p-4 border w-full border-gray-300 rounded-full text-gray-400'>
                    Add a comment
                </div>
            }
        </div>

    )
}

export default CommentField