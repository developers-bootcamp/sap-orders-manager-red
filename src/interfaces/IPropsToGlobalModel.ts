export default interface IPropsToGlobalTable{
    head : {name:string,type:string,options?:any}[],
    rows : object[],
    whatToAdd:string,
    delete: any,
    add:any,
    edit:any,
}