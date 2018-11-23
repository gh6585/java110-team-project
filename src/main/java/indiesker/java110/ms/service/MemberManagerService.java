package indiesker.java110.ms.service;

import java.util.List;
import indiesker.java110.ms.domain.Busker;
import indiesker.java110.ms.domain.GradleMember;
import indiesker.java110.ms.domain.MemberManager;
import indiesker.java110.ms.domain.Supporter;

public interface MemberManagerService {
  List<MemberManager> listAll(int pageNo, int pageSize);
  List<MemberManager> listSelect (char flag,int pageNo, int pageSize);
  List<MemberManager> dateSelect (String flag, String text,String cdt1,String cdt2,int pageNo, int pageSize);
  int update(String memo,String nik);
  List<GradleMember> gradleBusker (int pageNo, int pageSize);
  List<GradleMember> gradleSupporter (int pageNo, int pageSize);
  List<GradleMember> gradleAjaxBusker(int pageNo, int pageSize);
  List<GradleMember> gradleAjaxSupporter(int pageNo, int pageSize);
  List<GradleMember> gradleAjaxBuskerSelect(String sflag,String flag, String text,int pageNo, int pageSize);
  List<GradleMember> gradleAjaxSupporterSelect(String sflag,String flag, String text,int pageNo, int pageSize);
  
  List<GradleMember> gradleSelect(char flag,String email, String nik, int pageNo, int pageSize);
  
  MemberManager getMember(String nik);
  Busker getBusker(String nik);
  Supporter getSupporter(String nik);
}
