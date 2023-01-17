import './index.css'

const Header = ({ doneCount, leftToDoCount }) => {
    return (
        <div className="row mb-4">
            <h1 className="col-7 header-title">To do list</h1>
            <span className="col-5 header-info">{ leftToDoCount } more to do, { doneCount } done</span>
        </div>
    );
};

export default Header;