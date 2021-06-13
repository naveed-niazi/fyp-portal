import React from 'react';
import UnEligibleList from "../components/UnEligibleList"

import PageLayout from "../components/PageLayout"
const UserQue = ({ Data }) => {
    return (
        <PageLayout Title={Data.name} Icon={Data.icon}>
            <UnEligibleList />
        </PageLayout >
    );
};

export default UserQue;