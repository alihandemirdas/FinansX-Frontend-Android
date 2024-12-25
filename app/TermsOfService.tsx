import React from "react";
import { ScrollView, View, Text } from "react-native";

const TermsOfService: React.FC = () => {
  return (
    <ScrollView className="flex-1 bg-white dark:bg-[#232336]">
      <View className="justify-center items-center px-8 py-10">
        <Text className="text-black dark:text-white text-lg">
          FinansX Kullanım Sözleşmesi{"\n"}Son Güncelleme: [22.12.2024] {"\n\n"}
          Bu uygulama, kullanıcılarına güncel olarak anlık döviz ve altın fiyat
          bilgilerini sunar. Kullanıcılar uygulamayı indirerek aşağıdaki
          koşulları kabul etmiş sayılır.{"\n\n"}Hizmet Tanımı:{"\n"}FinansX,
          kullanıcı kaydı gerektirmeksizin finansal piyasa bilgileri sağlar.
          İletişim sayfasında girilen ad, soyad ve e-posta bilgileri yalnızca
          kullanıcıların talebi doğrultusunda yanıt sağlamak amacıyla
          kullanılmaktadır ve hiçbir şekilde depolanmaz.{"\n\n"}Sorumluluk
          Reddi:{"\n"}FinansX tarafından sunulan bilgiler yatırım kararları için
          temel alınmamalıdır.{"\n\n"}Reklam ve Ücretlendirme:{"\n"}Uygulama
          ücretsizdir ve reklam içerebilir. Reklam içeriklerinden doğabilecek
          sorunlar için FinansX sorumluluk kabul etmez.{"\n\n"}
          Gizlilik:{"\n"}Uygulama, kullanıcı bilgilerinin gizliliğine önem verir
          ve bu bilgileri saklamaz.{"\n\n"}Değişiklik Hakkı:{"\n"}FinansX, bu
          sözleşme koşullarını önceden bildirmeksizin değiştirme hakkını saklı
          tutar. Değişiklikler uygulama üzerinden duyurulur. Uygulamayı
          kullanarak bu koşulları kabul etmiş sayılırsınız. Herhangi bir sorunuz
          olması durumunda bizimle [katreodigital@gmail.com] üzerinden
          iletişime geçebilirsiniz.
        </Text>
      </View>
    </ScrollView>
  );
};

export default TermsOfService;
