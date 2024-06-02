const data:number[] = []


class usersData {
    public getUsers() {
        return(data);
    }

    public async createUser() {
        return true;
    }
}

export default new usersData();