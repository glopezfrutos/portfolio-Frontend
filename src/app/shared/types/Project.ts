export interface Project {
    id?: number;
    title: string;
    description: string;
    deploy?: string;
    backEndRepository?: string;
    frontEndRepository?: string;
    imgUrl?: string;
}
