library(tidyverse)
library(RWeka)

meta = read.csv("dokmeta.csv")
ngram3 = read.csv("ngram3.csv")

######### meta koos ngrammidega seotud koodide poolest #############################
kood_koos_3gramidega = tibble()
for(i in 1:nrow(meta)){
  
  #see töötab umbes 20min
  kood_koos_3gramidega = rbind(kood_koos_3gramidega, tibble(kood = meta[i,]$kood, ngramid = do.call(paste, as.list(ngram3[as.character(ngram3$kood) == as.character(meta[i,]$kood),]$ngram3))))
  print(i)
}

meta_koos_3gramidega = merge(meta, kood_koos_3gramidega, by="kood")

keeletase_koos_3grammidega = meta_koos_3gramidega[, c("ngramid","keeletase")] %>% na.omit() #alles need kirjed kus on olemas keeletase
write.arff(keeletase_koos_3grammidega, "keeletase_ja_ngramid.arff")
###################################################################################

######## funktsioon andmestike vähendamiseks

v2henda_andmestik = function(andmestik_mida_v2hendada, veerg1, veerg2, attribuudid, mitu_igast_tyybist){
  
  attribuutide_arv = vector("numeric", length(attribuudid)) 
  v2iksem_andmestik = tibble()
  
  for(i in 1:nrow(andmestik_mida_v2hendada)){
    for(j in 1:length(attribuudid)){
      if(as.character(andmestik_mida_v2hendada[i, veerg2]) == attribuudid[j] & attribuutide_arv[j] < mitu_igast_tyybist){
        attribuutide_arv[j] = attribuutide_arv[j] + 1
        v2iksem_andmestik = rbind(v2iksem_andmestik, tibble(veerg1 = andmestik_mida_v2hendada[i, veerg1], veerg2 = attribuudid[j]))
        break()
      }
    }
  }
  
  return(v2iksem_andmestik)
}

###################################################################################

#################### tabel keeletaseme ja kolmeste ngrammidega vaike ##############
keeletase_koos_3grammidega_vaike = v2henda_andmestik(keeletase_koos_3grammidega, 1,2, c("A","A1","A2","B","B1", "B2","C","C1","C2"), 40)

write.arff(keeletase_koos_3grammidega_vaike, "keeletase_ja_ngramid_vaike.arff")
###################################################################################
#################### tabel kus meta ja iga koodi tekst küljes #####################

meta_tekstidega = meta
meta_tekstidega$tekst = ""

failid = list.files("dokumendid", pattern = "*.txt", full.names = TRUE)
print(gsub("dokumendid/", "", gsub(".txt","",failid[1])))

for(i in 1:nrow(meta)){
  for(j in 1:length(failid)){
    if(as.character(meta[i,1]) == gsub("dokumendid/", "", gsub(".txt","",failid[j]))){
      
      data = tryCatch(
        { gsub("  ", " ",paste(readLines(failid[j], file.info(failid[j])$size, encoding = "UTF-8"), collapse = " ")) },
        error = function(cond){return(NA)}
      )
      
      print(i)
      meta_tekstidega[i,14] = as.character(data)
      break()
    } 
  }
}
# viska need read minema, kus pole teksti või mis on tühjad ning jätan alles ainult tekst ja keeletase veerud
keeletase_tekstiga = meta_tekstidega[, c("tekst","keeletase")] %>% na.omit() %>% .[!(.$tekst == ""),]
write.arff(keeletase_tekstiga, "keeletase_tekstiga.arff")
##################################################################################

#################### tabel keeletaseme ja kolmeste ngrammidega vaike ##############
keeletase_tekstiga_vaike = v2henda_andmestik(keeletase_tekstiga, 1, 2, c("A","A1","A2","B","B1", "B2","C","C1","C2"), 40)

write.arff(keeletase_tekstiga_vaike, "keeletase_tekstiga_vaike.arff")
###################################################################################

########### mõlemad tabeli tüübid aga ainult A2, B1, B2, C1 tasemetega ############

neli_keeletaset_ngramidega = keeletase_koos_3grammidega[keeletase_koos_3grammidega$keeletase %in% c("A2", "B1", "B2", "C1"),]
write.arff(neli_keeletaset_ngramidega, "neli_keeletaset_ngramidega.arff")

neli_keeletaset_tekstidega = keeletase_tekstiga[keeletase_tekstiga$keeletase %in% c("A2", "B1", "B2", "C1"),]
write.arff(neli_keeletaset_tekstidega, "neli_keeletaset_tekstiga.arff")
###################################################################################

########## tabel koos keeletaseme, teksti ja ngramidega, aind 4 keeletaset ########

tase_tekst_ngramid_4 = merge(meta_koos_3gramidega[, c("kood", "keeletase","ngramid")], meta_tekstidega[,c("kood", "tekst")], by="kood") %>% .[.$keeletase %in% c("A2", "B1", "B2","C1"), c("tekst", "ngramid", "keeletase")]
write.arff(tase_tekst_ngramid_4, "tase_tekst_ngramid_4.arff")
