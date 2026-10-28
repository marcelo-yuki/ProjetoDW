const categoriesController = {
    list: async () => {
        const categoriesList = await supabaseClient.from("categorias").select()

        return categoriesList.data
    }
}