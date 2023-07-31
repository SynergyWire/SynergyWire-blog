import React from 'react'

const page = () => {
  return (
    <main>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec justo vel risus fringilla finibus vitae nec sapien. Etiam non mi sapien. Nulla facilisi. Proin ac rhoncus massa. Quisque fringilla sem ac ligula maximus, eu commodo sapien efficitur. Nam non tortor quis metus venenatis tincidunt. Ut maximus, purus id fermentum tincidunt, neque libero convallis urna, sit amet lacinia odio nunc a risus. Sed blandit metus quis quam ultrices, vitae dapibus tellus consequat. Nullam vel convallis elit, vitae finibus enim. Nullam eget leo eget purus pharetra scelerisque. Sed at risus in dolor faucibus viverra a et odio.</p>
        
        <section className="author-card">
            <h2 className="author-card__name">
                Sierra
            </h2>
            <img src="" alt="" className="author-card__picture" />
            <p className="author-card__introduction">some funny guy</p>
            <section className="author-card__socials"></section>
        </section>
    </main>
  )
}

export default page