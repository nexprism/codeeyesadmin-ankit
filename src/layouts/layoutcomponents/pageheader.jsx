import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PageHeader = (props) => {

  return (
    <div className=''>
      <div className="page-header">
        <div>
          <h1 className="page-title">{props.titles}</h1>
          <Breadcrumb>
            {props.items.map((value, index) => {
              if (props.links) {
                return (
                  <Breadcrumb.Item key={index} className="breadcrumb-item">
                    <Link to={props.links[index]}>{value}</Link>
                  </Breadcrumb.Item>
                );
              } else {
                return (
                  <Breadcrumb.Item key={index} className="breadcrumb-item">
                    {value}
                  </Breadcrumb.Item>
                );
              }
            })}
            <Breadcrumb.Item className="breadcrumb-item active" aria-current="page">{props.active}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
         {/* <div className="ms-auto pageheader-btn">
          <Link to="#" className="btn btn-primary btn-icon text-white me-3">
            <span>
              <i className="fe fe-plus"></i>&nbsp;
            </span>
            Add Account
          </Link>
          <Link to="#" className="btn btn-success btn-icon text-white">
            <span>
              <i className="fe fe-log-in"></i>&nbsp;
            </span>
            Export
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default PageHeader;
