# KUTAY KOCA - API PROJECT
## Temel Özellikleri ve Amacı
Bandırma lokasyonunda bulunan istasyonlar API tarafından otomatik olarak alınır ve veritabanına kayıt edilir. Son kullanıcının bulunduğu konum alınır ve kullanıcıya en yakın olan durak belirlenir.
## Kurulum Talimatları
Server tarafında Nodejs - Python ve MongoDB teknolojilerinin kurulu olması gerekmektedir. Ubuntu serverlar içerisinde bunlar genellikle kurulu olarak gelecektir. 
## Kullanım Talimatları
Kök dizin içerisinde bulunan .env dosyasını düzenlenmesi gerekemektedir. MongoDB veritabanı bağlantısı için gerekli olan söz dizimi burada yer alır. Örnek söz dizimi şu şekildedir.

    CONNECTION_STRING  = mongodb://localhost:27017/kutaykoca
Servisin size sağlamış olduğu söz dizimi ile burayı güncelleyin.

    npm install
   Bu komut ile bağımlılıkları yükledikten sonra servisi aşağıdaki komut ile çalıştırabilirsiniz.
   

    npm run start

 
## İstekler ve Dönüş Değerleri

> http://siteadı.com/api/getLocation
> Bu istek POST isteğidir. Bu adrese kullanıcının lokasyon bilgilerinin iletilmesi gerekmektedir. Örnek veri formatı aşağıdaki gibi olmalıdır.

        {
    
		    "location":  {
    
			    "latitude":  "40.34105",
    
			    "longitude"  :  "27.95825"
    
		    }
    
	    }
Burada gönderilen değere karşılak dönen değer ise aşağıdaki gibi olacaktır.

    HTTP/1.1 200 OK  
    X-Powered-By: Express  
    Content-Type: application/json; charset=utf-8  
    Content-Length: 165  
    ETag: W/"a5-kwLc6g+/ucVotGD4D2ejLy0YpTI"  
    Date: Sat, 01 Jul 2023 14:33:15 GMT  
    Connection: close  
    {  
	    "message": "distance calculate success",  
	    "data": {  
		    "name": "BAN-106 ÇAMLIK DURAĞI 1",  
		    "latidute": "40.34068434861845",  
		    "longitude": "27.95689087361097",  "distance": "0.12"  
			    }  
	}

> http://siteadı.com/api/getStation 
> Bu istek bir GET isteğidir. Sisteme istasyonların getirilmesini sağlar. Bandırma ilçesinde bulunan tüm istasyonlar bu istek ile getirilir ve veritabanına kayıt edilir. Bu komutun periyodik olarak çalıştırılması doğru olacaktır. Buraya yapılan istekten dönen değer aşağıdaki gibidir.

    HTTP/1.1 200 OK
    X-Powered-By:  Express
    Content-Type:  application/json; charset=utf-8
    Content-Length:  33
    ETag:  W/"21-kcu+Fz9E3TZV0CWlRR68lyMaAZA"
    Date:  Sat, 01 Jul 2023 13:55:51 GMT
    Connection:  close
    
    {"message":"Get Station Success"}
