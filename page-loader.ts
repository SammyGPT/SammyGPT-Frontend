class PageLoader{

    private page_name: string;
    private content_path: string = "./page-content"
    public page_content: object | null;

    constructor(page_name: string){
        this.page_name = page_name;
        this.page_content = this.load_page();
    }   

    private load_page(): object | null{
        try {
            const fileContent = fs.readFileSync(`${this.content_path}/${this.page_name}.json`, 'utf-8');
            return JSON.parse(fileContent);
        } catch (error) {
            console.error("Error reading JSON file:", error);
            return null;
        }
    }

}

export default PageLoader