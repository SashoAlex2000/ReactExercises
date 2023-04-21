
import './Card.css';

// acts as a shell around orther components, reusability of CSS and avoid code duplication - composition
// props.children - otherwise it doesn't work, used to pass in the component into the Card
// we needed to (dynamically) add the other classes, they don't work out of the box
function Card (props) {

    const classes = "card " + props.className;

    return <div className={classes}>
        {props.children}
    </div>
}

export default Card;
