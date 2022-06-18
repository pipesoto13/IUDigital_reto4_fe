<template>
  <h1>Show subject</h1>
</template>

<script>
export default {
  name: 'ShowSubject'
}
</script>
<template>
  <div class="row">
        <div class="col-12 mb-2">
            <!-- llamamos al componente para Crear   -->
            <router-link :to='{name:"add-subject"}' class="btn btn-success">Agregar <font-awesome-icon icon="fa-solid fa-plus" ></font-awesome-icon></router-link>
        </div>
        <div class="col-12">
          <div class="table-responsive">
              <table class="table table-bordered">
                  <thead class="thead-dark text-white">
                      <tr>
                          <th>Nombre</th>
                          <th>Creditos</th>
                          <th>Profesor</th>
                      </tr>
                  </thead>
                  <tbody class="table-striped">
                      <tr v-for="subject in subjects" :key="subject.id">
                          <td>{{ subject.name }}</td>
                          <td>{{ subject.credits }}</td>
                          <td>{{ subject.teacher }}</td>
                          <td>
                              <button type="button" @click="itemClicked(subject)" class="btn btn-warning" data-toggle="modal" data-target="#exampleModal">
                                Detalles
                              </button>
                              <!-- llamamos al componente para Editar     -->
                              <router-link :to='{name:"edit-subject",params:{id:subject.id}}' class="btn btn-info"><font-awesome-icon icon="fa-solid fa-pencil" ></font-awesome-icon></router-link>
                              <a type="button" @click="deleteSubject(subject.id)" class="btn btn-danger"><font-awesome-icon icon="fa-solid fa-trash-can" ></font-awesome-icon></a>
                          </td>
                      </tr>
                  </tbody>
              </table>
          </div>
        </div>

        <!-- Modal -->
        <div class="modal fade bg-light" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header text-light bg-dark">
                <h5 class="modal-title" id="exampleModalLabel" >{{currentSubject.name}}</h5>
                <button type="buttons" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true" style="color: white">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="card" style="width: 18rem;">
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">Creditos: {{currentSubject.credits}}</li>
                    <li class="list-group-item">Profesor: {{currentSubject.teacher}}</li>
                    <li class="list-group-item">Prerequisito: {{currentSubject.subjectReq}}</li>
                    <li class="list-group-item">Horas Autonomas: {{currentSubject.autHours}}</li>
                    <li class="list-group-item">Horas Directas: {{currentSubject.dirHours}}</li>
                  </ul>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-dark" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ShowSubject',
      data(){
        return {
            subjects:[],
            currentSubject: {
              name: '',
              credits: '',
              teacher: '',
              subjectReq: '',
              autHours: '',
              dirHours: ''
            }
        }
    },
    mounted(){
        this.showSubjects()
    },
    methods:{
        async showSubjects(){
            await this.$http.get('http://127.0.0.1:8000/api/subjects').then(response=>{
                this.subjects = response.data
            }).catch(error=>{
                console.log(error)
                this.subjects = []
            })
        },
        deleteSubject(id){
            if(confirm("¿Confirma eliminar el registro?")){
                this.$http.delete(`http://127.0.0.1:8000/api/subjects/${id}`).then(response=>{
                    this.showSubjects()
                }).catch(error=>{
                    console.log(error)
                })
            }
        },
        itemClicked(subject){
          this.currentSubject.name = subject.name
          this.currentSubject.credits = subject.credits
          this.currentSubject.teacher = subject.teacher
          this.currentSubject.subjectReq = subject.subjectReq
          this.currentSubject.autHours = subject.autHours
          this.currentSubject.dirHours = subject.dirHours
        }
    }
}
</script>
