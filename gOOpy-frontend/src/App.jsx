import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import PageHeader from './components/PageHeader';

export default function App() {
    return (
        <>
            <PageHeader />
            <Outlet />
        </>
    );
}
