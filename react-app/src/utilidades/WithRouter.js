import { Outlet, useLocation, useParams } from 'react-router-dom';

const withRouter = WrappedComponent => props => {
    const params = useParams();
    const { pathname } = useLocation()
    const match = { url: pathname, params: useParams() } 
  
    return (
      <WrappedComponent
        {...props}
        params={params}
        match={match}
      />
    );
  };

export default withRouter;