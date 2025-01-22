"use client"

import { GrPowerReset } from "react-icons/gr";

import { Button, Input, Textarea, Select, SelectItem, Form } from "@heroui/react";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react";


const arr_statuts = ["Non-prioritaire", "Urgent", "Modéré"] as const
type t_arr_statuts = typeof arr_statuts
type enum_status = t_arr_statuts[number]


interface IStatus {
    key: enum_status,
    label: enum_status
}

const jsonStatus = [
    {key: "Non-prioritaire", label: "Non-prioritaire"},
    {key: "Urgent", label: "Urgent"},
    {key: "Modéré", label: "Modéré"},
] satisfies IStatus[]

// Définir le schéma Zod pour valider le formulaire
const leadSchema = z.object({
  titre: z.string().min(1, "Le titre est requis"),
  email: z.string().email("Veuillez entrer une adresse email valide").min(1, "L'email est requis"),
  nom: z.string().min(1, "Le nom est requis"),
  message: z.string().min(1, "Le message est requis"),
  status: z.enum(arr_statuts),
})

type LeadFormData = z.infer<typeof leadSchema>

export default function LeadForm() {

    const [modalMessage, setModalMessage] = useState<string | null>(null) // État pour le message de la modal
    const [isModalVisible, setModalVisible] = useState(false) // État pour afficher ou masquer la modal
  

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema), // Utilisation du schéma de validation Zod
  })

  const _onSubmitPopup = (data:any)=>{
    if (data.status.includes(arr_statuts[1])) {
        setModalMessage("Nous traiterons votre demande en priorité.")
      } else {
        setModalMessage("Merci pour votre message, nous reviendrons vers vous rapidement.")
      }
  
      // Afficher le popup
      setModalVisible(true)
  }
  // Fonction de soumission du formulaire
  const onSubmit = async (data: LeadFormData) => {
    console.log({data})
    let response = {} as any
    try{
        response = await fetch('/api/younesform', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        _onSubmitPopup(data)
    }catch(e){
        console.error(e)
    }

    console.log({response})
    
  }

  // Fonction pour réinitialiser le formulaire
  const handleReset = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    reset()
  }


  const closeModal = () => {
    setModalVisible(false)
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-8">Leads</h1>

      <Form onSubmit={handleSubmit(onSubmit)}>

          <Input
            isRequired
            errorMessage={errors.titre?.message}
            label="Titre"
            labelPlacement="outside"
            {...register("titre")}
            placeholder="Entrez un titre"
          />
        


          <Input
            isRequired
            errorMessage={errors.email?.message}
            label="Email"
            labelPlacement="outside"
            type="email"
            {...register("email")}
            placeholder="Entrez votre email"
          />
        


          <Input
            isRequired
            errorMessage={errors.nom?.message}
            label="Nom"
            labelPlacement="outside"
            {...register("nom")}
            placeholder="Entrez votre nom"
          />
        


          <Textarea
            isRequired
            errorMessage={errors.message?.message}
            label="Message"
            labelPlacement="outside"
            {...register("message")}
            placeholder="Entrez votre message"
            className="min-h-[100px]"
          />
        


          <Select
            label="Statut"
            isRequired
            items={jsonStatus as any}
            aria-label="Sélectionner un statut"
            onSelectionChange={(keys) => {
                const selectedValue = Array.from(keys)[0] as enum_status
                setValue("status", selectedValue);
            }}
            errorMessage={errors.status?.message}
            color="primary"
          >
            {(statut:Exclude<Parameters<typeof Select>[0]["items"],undefined> & IStatus)=><SelectItem>{statut.label}</SelectItem>}
          </Select>
        

        <div className="flex items-center justify-between pt-4">
          <a
            href="#"
            onClick={handleReset}
            className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-2"
          >
            <GrPowerReset className="h-4 w-4" />
            Effacer le formulaire
          </a>

          <Button type="submit" color="primary">
            Envoyer
          </Button>
        </div>
        
      </Form>

      <p className="text-gray-500 text-sm mt-4">
        N&apos;envoyez pas de mots de passe par ce formulaire. Signalez une utilisation détournée d&apos;un formulaire.
      </p>
      {isModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <p className="text-lg">{modalMessage}</p>
            <button
              onClick={closeModal}
              className="mt-4 text-blue-500 hover:text-blue-700"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  )
}


