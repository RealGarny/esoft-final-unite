const data:number[] = []


class usersData {
    public createUser() {
        return({
            login: "RealGarny", //unique
            username: "Garny", //string (4-20)
            userLogoUrl: "http://unitecdn.com/logos/RealGarny",

        });
    }
}

export default new usersData();