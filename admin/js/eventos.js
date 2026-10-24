const eventsController = {
    templateItem: (item) => {
        return `
             <tr>
                <td>${item.nome}</td>
                <td>${item.categoria.nome}</td>
                <td>${item.data}</td>
                <td>${item.local}</td>
                <td>${item.vagas_restantes}/${item.vagas_totais}</td>
                <td class="actions">
                    <a class="btn-sm btn-edit" href="inscritos.html?evento=${item.id}">Ver inscritos</a>
                    <button type="button" class="btn-sm btn-edit">Editar</button>
                    <button type="button" class="btn-sm btn-delete">Excluir</button>
                </td>
            </tr>
        ` 
    }, 
    list: async () => {
        const eventsList = await supabaseClient.from("eventos").select(`
                *,
                categoria:categorias(*)
            `)
    return eventsList.data;
    },
    mountCategories: async () => {
        const categorias =  await categoriasController.list()

        const template = categories.map(item => {
            return ` <option value="${item.id}">${item.nome}</option>
            `
        }).join("")

        document.querySelector("#campo-categoria").innerHTML = template
    },
    init: async () => {
        const events = await eventsController.list() 

        const template = events.map(item => {
            return eventsController.templateItem(item)
        }).join("")

        document.querySelector("#events").innerHTML = template
    }
}

document.addEventListener("DOMContentLoaded", eventsController.init, null)