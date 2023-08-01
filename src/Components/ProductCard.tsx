const ProductCard: React.FC<any> = (props) => {

  
  return (
    <div className="productcard">
      <img src={props.url} />

      <h4>{props.title}</h4>
    </div>
  );
};

export default ProductCard;
