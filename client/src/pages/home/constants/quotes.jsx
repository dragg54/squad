export const Quote = () =>{
    const quotes = [
        {
            quote: "The most courageous act is still to think for yourself.",
            author: "Coco Chanel"
        },
        {
            quote: "Those who dare to fail miserably can achieve greatly.",
            author: "John F Kennedy"
        },
        {
            quote: "You only live once, but if you do it right, once is enough.",
            author: "Mae West"
        },
        // {
        //     quote: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        //     author: "Winston CHurch Hill"
        // },
    ]
    return quotes.map((quote, index) =>(
        <div key={index} className="!text-purple-100 flex flex-col justify-center items-start w-full -mt-2 h-full">
            <p className="!text-purple-100 text-xl font-semibold mb-2">{quote.quote}</p>
            <p className="!text-purple-100">- {quote.author}</p>
        </div>
    ))
}

