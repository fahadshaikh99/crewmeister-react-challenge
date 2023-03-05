import React from 'react';
// import { render, fireEvent } from '@testing-library/react';
import { createAbsencesListWithMembers, createMembersObjectByUserId } from './functions';


describe('Home component', () => {
    it('should create a members object from an array', () => {
        const members = [
            { userId: 1, name: 'Member 1' },
            { userId: 2, name: 'Member 2' },
            { userId: 3, name: 'Member 3' },
        ];
        const membersObject = createMembersObjectByUserId(members);
        expect(membersObject).toEqual({
            1: { userId: 1, name: 'Member 1' },
            2: { userId: 2, name: 'Member 2' },
            3: { userId: 3, name: 'Member 3' },
        });
    });
})



