package indiesker.java110.ms.dao;

import java.util.List;
import indiesker.java110.ms.domain.StagePhoto;
import indiesker.java110.ms.domain.Supporter;

public interface SupporterDao {
  int checkName(String name);
  int insert(Supporter supporter);
  int insertfile(StagePhoto stagephoto);
  List<Integer> findBySupporter(int no);
  void updateSup(Supporter supporter);
  void updateFile(StagePhoto phot);
  int[] findBySpno(int no);
  Supporter findAll(int no);
  StagePhoto[] findbyPhoto(int no);
}

