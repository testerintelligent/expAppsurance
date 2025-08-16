const {PersonalClient}=require("../Models/ClientModel.js")

//PersonalClient-/newPersonalClient
                            exports.enterPersonalClientDetails=async(req,res)=>{
                                try{        
                                    const newClient = new PersonalClient(req.body);
                                    await newClient.save();
                                    
                                        res.status(201).json({message:"New Personal Client Created Succesfully"})
                                }
                                catch(error){
                                    res.status(500).json({Message:"Error to create a new Personal Client"})
                                }
                            }


//PersonalClient-/getPersonalClients
                            exports.getPersonalClients=(async(req,res)=>{
                                try{
                                        const Clients=await PersonalClient.find({});
                                        res.status(200).json(Clients)
                                }
                                catch(error){
                                    res.status(500).json({Message:"Error to get a Personal Client"})
                                }
                            })


//PersonalClient-/deleteClient/{ClientNo}
                                            exports.deletePersonalClient=async(req,res)=>{
                                                try {
                                                    const {ClientNo} = req.params;
                                                    const result=await PersonalClient.findOneAndDelete({ClientNo:ClientNo})
                                                    if(!result){
                                                        res.status(404).json({Message:"Personal Client not found"})
                                                    }
                                                    else{
                                                        res.status(200).json({Message:"Personal Client got deleted successfully"})
                                                    }

                                                } catch (error) {
                                                    res.status(500).json({Message:"Error to delete a Personal Client"})
                                                }
                                            }

//PersonalClient- /view/{ClientNo}
exports.getaSinglePersonalClient=async(req,res)=>{
            try{
                    const{ClientNo}=req.params;
                    const result=await PersonalClient.findOne({ClientNo:ClientNo})
                    if(!result){
                        res.status(404).json({Message:"Cant View Personal Client "})
                    }
                    else{
                         res.status(200).json({result})
                    }
            }
            catch(error){
                     res.status(500).json({Message:"Error to view a Personal Client"})
            }
}



























